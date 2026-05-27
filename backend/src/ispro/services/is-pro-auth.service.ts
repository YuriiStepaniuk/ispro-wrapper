import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isproHttp } from 'src/shared/ispro-http';

@Injectable()
export class IsProAuthService {
  private session: {
    sessionToken: string;
    bearer: string;
    expiresAt: Date;
  } | null = null;

  constructor(private readonly config: ConfigService) {}

  async registerStation(): Promise<{
    sessionToken: string;
    stationId: number;
  }> {
    const data = await isproHttp.post('/api/session/station/register', {});

    return {
      sessionToken: data.data.sessionToken,
      stationId: data.data.station,
    };
  }

  async loginUser(sessionToken: string, stationId: number) {
    const { data } = await isproHttp.post(
      '/api/session/signin',
      {
        Login: this.config.get('ISPRO_LOGIN'),
        Password: this.config.get('ISPRO_PASSWORD'),
        StatCd: stationId,
        CheckDuplLogin: false,
      },
      { headers: { SessionToken: sessionToken } },
    );
    return data.data.token as string;
  }

  async registerFirm(sessionToken: string, bearer: string) {
    await isproHttp.post(
      '/api/session/firm/signin',
      { firm: this.config.get<number>('ISPRO_FIRM_CODE') },
      {
        headers: {
          SessionToken: sessionToken,
          Authorization: `Bearer ${bearer}`,
        },
      },
    );
  }

  async getHeaders(): Promise<Record<string, string>> {
    if (!this.session || this.session.expiresAt < new Date()) {
      const { sessionToken, stationId } = await this.registerStation();
      const bearer = await this.loginUser(sessionToken, stationId);
      await this.registerFirm(sessionToken, bearer);

      this.session = {
        sessionToken,
        bearer,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      };
    }

    return {
      SessionToken: this.session.sessionToken,
      Authorization: `Bearer ${this.session.bearer}`,
      'Content-Type': 'application/json',
    };
  }

  invalidateSession(): void {
    this.session = null;
  }
}

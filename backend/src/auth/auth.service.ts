import { Injectable } from '@nestjs/common';
import { IsProAuthService } from 'src/ispro/services/is-pro-auth.service';

@Injectable()
export class AuthService {
  constructor(private readonly isProAuthService: IsProAuthService) {}

  async login() {
    await this.isProAuthService.getHeaders();
  }
}

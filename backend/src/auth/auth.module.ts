import { Module } from '@nestjs/common';
import { IsProModule } from 'src/ispro/ispro.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [IsProModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

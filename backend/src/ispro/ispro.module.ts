import { Module } from '@nestjs/common';
import { IsProService } from './ispro.service';
import { IsProAuthService } from './services/is-pro-auth.service';

@Module({
  providers: [IsProService],
  exports: [IsProService, IsProAuthService],
})
export class IsProModule {}

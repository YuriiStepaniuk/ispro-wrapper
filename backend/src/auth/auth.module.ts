import { Module } from '@nestjs/common';
import { IsProModule } from 'src/ispro/ispro.module';

@Module({ imports: [IsProModule] })
export class AuthModule {}

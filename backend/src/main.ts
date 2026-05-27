import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      transform: true, // auto-transform payloads to DTO class instances
      forbidNonWhitelisted: true, // throw on unknown properties
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 4000;

  await app.listen(port);
}
bootstrap();

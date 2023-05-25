import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
// import { inject } from '@vercel/analytics';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // inject();
  app.useGlobalPipes(new ValidationPipe());

  const whitelist = process.env.ALLOW_LIST || '';

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  await app.listen(3000);
}

bootstrap();

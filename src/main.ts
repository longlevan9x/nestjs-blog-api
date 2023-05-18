import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: [process.env.DOMAIN_ALLOW] });
  await app.listen(3000);
}

bootstrap();

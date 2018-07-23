import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, createAPIDocument } from './app.config';

// TODO: Adding Winston Logger
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createLogger(); // creating logger;
  createAPIDocument(app);
  await app.listen(parseInt(process.env.PORT)); // fuck you tslint!!!!
}
bootstrap();

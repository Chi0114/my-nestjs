import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { ValidationPipe,Logger } from '@nestjs/common';
import { instance } from './modules/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  const logger = new Logger();
  logger.log("winston logger加载成功");

  //Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  logger.log("Swagger UI 加载成功");
  //校验
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

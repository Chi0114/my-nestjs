import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug' ,'error', 'warn'],
  });
  const logger = new Logger(bootstrap.name,{timestamp:true});

  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  logger.log("main ts starting");
  await app.listen(3000);
}
bootstrap();

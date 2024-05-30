import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  /** BODY REQUEST VALIDATOR */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /** CORS */
  app.enableCors();

  /** SWAGGER CONFIGURATION */
  const config = new DocumentBuilder()
    .setTitle('Desafio Yape')
    .setDescription('Server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  /** PORT CONFIG */
  const port = configService.get<number>('port');
  await app.listen(port);
}
bootstrap();

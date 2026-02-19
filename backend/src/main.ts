import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: { level: 'debug' },
    }),
  );

  await app.register(fastifyCookie);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('The CRM API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document);

  // write openapi spec to file for frontend use
  const fs = await import('fs/promises');
  await fs.writeFile(
    'openapi-spec.json',
    JSON.stringify(document, null, 2),
    'utf-8',
  );

  await app.listen(4000, '0.0.0.0');
}
bootstrap();

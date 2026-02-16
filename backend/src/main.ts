import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifySecureSession from '@fastify/secure-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: { level: 'debug' },
    }),
  );

  const configService = app.get(ConfigService);

  await app.register(fastifySecureSession, {
    key: Buffer.from(
      configService.getOrThrow<string>('SESSION_SECRET'), // 32 bytes key for encryption
      'hex',
    ),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  });

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

  await app.listen(4000);
}
bootstrap();

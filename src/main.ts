import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { name, version } from '../package.json';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/filters/global-exception.filter';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
  });
  const reflector = app.get(Reflector);
  app.useGlobalFilters(new HttpExceptionFilter(reflector));

  const host = process.env.APP_HOST;
  const port = process.env.APP_PORT;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription('Test Task API Documentations')
    .setVersion(version)
    .addBearerAuth(undefined, 'USER')
    .addBearerAuth(undefined, 'USER_REFRESH')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.info(`🚀 Api documentation on http://${host}:${port}/api`);
}
bootstrap();

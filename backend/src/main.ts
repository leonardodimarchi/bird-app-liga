/* #region  Imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
/* #endregion */

const bodyParser = require('body-parser');

/**
 * Método que configura o Swagger para a aplicação
 *
 * @param app A instância da aplicação
 * @param config As configurações do projeto
 */
function setupSwagger(app: INestApplication, config: ConfigService): void {
  if (!config.get<boolean>('SWAGGER_ENABLED'))
    return;

  const swaggerOptions = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE'))
    .setDescription(config.get<string>('SWAGGER_DESCRIPTION'))
    .setVersion(config.get<string>('SWAGGER_VERSION'))
    .addTag(config.get<string>('SWAGGER_TAG'))
    .addBearerAuth({ type: 'apiKey', scheme: 'bearer' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(`${config.get<string>('API_BASE_PATH')}/swagger`, app, document);
}


/**
 * Método que configura os pipes globais
 *
 * @param app A instância da aplicação
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
}

/**
 * Método que configura os middleware da aplicação
 *
 * @param app A instância da aplicação
 */
function setupMiddleware(app: INestApplication): void {
  app.use(helmet());

  app.enableCors();

  app.use(bodyParser.json({
    limit: '50mb',
  }));

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }));
}

export async function setup(app: INestApplication, config: ConfigService): Promise<INestApplication> {
  setupSwagger(app, config);
  setupPipes(app);
  setupMiddleware(app);

  app.setGlobalPrefix(config.get<string>('API_BASE_PATH'));

  return app;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  await setup(app, config);

  await app.listen(config.get<number>('PORT') || 3000);
}

bootstrap();

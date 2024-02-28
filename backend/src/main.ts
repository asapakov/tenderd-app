import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Tenderd backend');
  const app = await NestFactory.create(AppModule);

  // activates using validators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );

  // sets global prefix /api to all routes
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Tenderd Swagger')
    .setDescription('The Tenderd rest api collection.')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  // using logger module
  app.useLogger(logger);

  // using CORS
  app.enableCors({
    origin: true,
    methods: '*',
  });
  await app
    .listen(process.env.NEST_APP_PORT)
    .then(() => logger.log(`Listening ${process.env.NEST_APP_PORT} port`));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DatabaseService } from './shared/database/database.service';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Magic the Gathering API')
    .setDescription('Magic the Gathering API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const databaseService = app.get(DatabaseService);
  await databaseService.synchronizeAndRunMigrations();

  const configService = app.get(ConfigService);

  const rabbitMQUrl =
    configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: 'deck_updates_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();

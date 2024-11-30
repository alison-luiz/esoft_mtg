import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rabbitMQUrl =
    configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: 'card_create_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: 'deck_import_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

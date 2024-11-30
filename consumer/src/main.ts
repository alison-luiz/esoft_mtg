import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rabbitMQUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
  const queueName = configService.get<string>('RABBITMQ_QUEUE') || 'notifications';

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

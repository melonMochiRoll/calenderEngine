import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOption = {
    origin: 'http://localhost:9000',
    methods: ['GET'],
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOption);

  const port = 3000;
  await app.listen(port);
  console.log(`PORT :: ${port} server already`);
}
bootstrap();

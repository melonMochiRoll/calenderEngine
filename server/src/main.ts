import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import 'dotenv/config'
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const devCorsOption = {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 204,
  };
  app.enableCors(devCorsOption);

  const sessionOption = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  };
  app.use(session(sessionOption));
  app.use(passport.initialize());
  app.use(passport.session());

  const port = Number(process.env.PORT);
  await app.listen(port);
  console.log(`PORT :: ${port} server is ready`);
}

bootstrap();
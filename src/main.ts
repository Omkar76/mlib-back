import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/")
  app.use(cookieParser());

  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: true,
      resave: true,
      cookie: {
        secure : false
      },
    }),
  );
  app.use(passport.initialize());
  // app.use(passport.session());
  app.use((req,res,next)=>{
    console.log(req.user);
    next();
  })
  await app.listen(3000);
}
bootstrap();

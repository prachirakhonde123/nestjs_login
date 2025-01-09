import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin : "http://localhost:3000",
    methods : "GET,POST,DELETE,PUT,PATCH",
    credentials : true
  })

  app.use(
    session({
      secret: 'your-secret-key', // Replace with your secret
      resave: false,
      saveUninitialized: false,
      cookie: {
          httpOnly: true,
          secure: false, // Set to `true` in production with HTTPS
          maxAge: 3600000, // 1 hour
      },
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())
  
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5000);
  console.log(`Application is running on: http://localhost:5000`);

}
bootstrap();

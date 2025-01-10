import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [DatabaseModule,UserModule,AuthModule,JwtModule.register({
      secret: 'your-secret-key', // Or use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiry
    }), 
    ConfigModule.forRoot({isGlobal:true}),   
  ],
  controllers: [AppController,AuthController],
  providers: [AppService,AuthService],
})
export class AppModule {}

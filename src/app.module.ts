import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactUsFormModule } from './contactUs-form/contactus.module';

@Module({
  imports: [DatabaseModule,UserModule,AuthModule,ContactUsFormModule,
    ConfigModule.forRoot({isGlobal:true}),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

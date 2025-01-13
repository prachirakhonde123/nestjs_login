import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports : [UserModule,
    JwtModule.register({
      secret: 'thisissecretekey', // Replace with a strong secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers : [AuthController],
  providers: [AuthService,JwtService,JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}

/*
Why Include the SessionSerializer in AuthModule?
The SessionSerializer is responsible for serializing and deserializing user data 
for sessions when using Passport.js with sessions. It must be registered as a 
provider in the module handling authentication (in this case, AuthModule).
*/

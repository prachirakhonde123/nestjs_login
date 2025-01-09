import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';


@Module({
  imports : [UserModule,PassportModule.register({ session: true })],
  providers: [AuthService,LocalStrategy,SessionSerializer]
})
export class AuthModule {}

/*
Why Include the SessionSerializer in AuthModule?
The SessionSerializer is responsible for serializing and deserializing user data 
for sessions when using Passport.js with sessions. It must be registered as a 
provider in the module handling authentication (in this case, AuthModule).
*/

import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports : [
    PassportModule,
    JwtModule.register({
      secret : 'secretekey123',
      signOptions : {expiresIn : '1h'}
    }),
    forwardRef(() => UserModule),
  ],
  providers : [AuthService,JwtStrategy],
  exports : [JwtModule]
})

export class AuthModule{}
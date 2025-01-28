import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports : [
        ConfigModule,
        PassportModule.register({defaultStrategy : 'jwt'}),
        JwtModule.registerAsync({    // this module provide jwt service and we import it in authservice
            // secret : 'helloworld',
            // signOptions : {
            //     expiresIn : 3600
            // }
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService : ConfigService)=>({
                secret : configService.get('JWT_SECRET'),
                signOptions : {
                    expiresIn : 3600
                }
            })
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers : [AuthController],
    providers : [AuthService,JwtStrategy],
    exports : [JwtStrategy, PassportModule] // this allow any other module that imports this AuthModule to apply this authentication
})
export class AuthModule{}

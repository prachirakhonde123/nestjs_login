import { Module, NestModule, MiddlewareConsumer,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggedUserModel } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
    imports: [
        forwardRef(() => AuthModule), 
        MongooseModule.forFeature([{ name: 'LoggedUser', schema: LoggedUserModel.schema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports : [UserService,MongooseModule]
})

export class UserModule{}
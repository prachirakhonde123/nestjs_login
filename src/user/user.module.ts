import { Module, NestModule, MiddlewareConsumer,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggedUserModel } from './user.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'LoggedUser', schema: LoggedUserModel.schema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports : [UserService,MongooseModule]
})

export class UserModule{}
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private readonly userService : UserService){}

    async ValidateUser(userName:string,password:string):Promise<any>{
        const user = await this.userService.getUser(userName);
        if(!user){
           throw new NotAcceptableException("User Not Found")
        }

        console.log('validate user is...',user)
        
        const matchPassword = await bcrypt.compare(password,user.password);
        if(user && matchPassword){
            return {
                userId : user.id,
                userName : user.userName
            }
        }

        return null;
    }
}

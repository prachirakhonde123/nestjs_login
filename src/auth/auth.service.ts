import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService
    ){}

    async ValidateUser(userName:string,password:string):Promise<any>{
        const user = await this.userService.getUser(userName);
        if(user === null){
            return {
                status : false,
                error : "User Not Found with this username"
            }
        }

        console.log('step 2 :////////////validate user is...',user)
        
        const matchPassword = await bcrypt.compare(password,user.password);
        if(user && matchPassword){
            return {
                userId : user.id,
                userName : user.userName
            }
        }else{
            return {
                status : false,
                error : 'Invalid Credentials'
            };
        }
    }

    async login(user : any){
        // console.log('logini2345678',user)
        const payload = {username : user.userName, id : user.userId}
        // console.log('Payload to sign:', payload);
        let token = this.jwtService.sign(payload,{secret:"thisissecretekey"})
        return {
            status : true,
            access_token : token,
            data : payload
        }
    }
}

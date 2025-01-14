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
        // console.log('user is..',user)
        if(user === null){
            return {
                status : false,
                message : "User Not Found with this username"
            }
        }
        
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
        const payload = {username : user.userName, id : user.userId}
        console.log('Payload to sign:', payload);
        let token = this.jwtService.sign(payload,{secret:"thisissecretekey"})
        return {
            status : true,
            access_token : token,
            data : payload
        }
    }
}

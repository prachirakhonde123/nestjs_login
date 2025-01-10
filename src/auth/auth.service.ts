import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'
import { LoggedUser } from "src/user/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
            private readonly jwtService : JwtService,
            private readonly userService : UserService
        ) {}

    async validateUser(userName: string, password: string): Promise<any>{
        try{
            let findUser = await this.userService.findByUsername(userName)
            if(!findUser){
                return {
                    status : false,
                    message : 'No User Found'
                }
            }
    
            let validUser = await bcrypt.compare(password, findUser.password)
            if(validUser){
                const { password, ...result } = findUser
                console.log('result is...',result);
                return result;
            }

            return {
                status : false,
                message : "Unauthorised User"
            }
        }
        catch(error){
            return {
                status : false,
                message : error.message
            }
        }
    }

    async login(user : LoggedUser) : Promise<{accessToken : string}>{
        const payload = {id : user.id}
        return {
            accessToken : this.jwtService.sign(payload)
        }
    }
}

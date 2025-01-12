import { Injectable, UnauthorizedException, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";
import { Response,Request } from "express";
import {ExtractJwt} from 'passport-jwt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){
        super({ usernameField: 'userName', passwordField: 'password' })
        console.log('LocalStrategy Initialized');
    }

    async validate(userName : string, password : string, @Req() req:Request):Promise<any>{
        try{
            console.log('local strategy is 234567...........',userName)
            console.log('local strategy is password...........',password)


            const user = await this.authService.ValidateUser(userName,password);
            if(!user){
                throw new UnauthorizedException("Unauthorised User");
            }
            console.log('validation successful',user)

            return user;
        
        }
        catch(error){
            throw error
        }

    }

}
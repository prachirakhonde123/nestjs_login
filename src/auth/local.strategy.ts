import { Injectable, UnauthorizedException, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";
import { Response } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){
        super({ usernameField: 'userName', passwordField: 'password' })
        console.log('LocalStrategy Initialized');
    }

    async validate(userName : string, password : string, @Req() req:Response):Promise<any>{
        try{
            console.log('validate is 234567...',userName)

            const user = await this.authService.ValidateUser(userName,password);
            if(!user){
                throw new UnauthorizedException("Unauthorised User");
            }
            console.log('validation successful')
            return user;
        
            return user;
        }
        catch(error){
            throw error
        }

    }

}
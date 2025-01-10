import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){
        super({usernameField:'email'})
    }

    async validate(email : string,password:string):Promise<any>{
        try{
            const user = await this.authService.validateUser(email,password)
            if(!user){
                throw new UnauthorizedException("Invalid Credentials")
            }
            return user;
        }
        catch(error){
            throw new InternalServerErrorException("Internal Server Error")
        }
    }
}
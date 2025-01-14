import { Controller, Post, Body, UseGuards, Get,Req,Res } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { Request,Response } from 'express';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} 
    private readonly saltRounds = 10;

    @Post('register')
    async Register(@Body() userData: Record<string, any>) {
        try {
            const { userName, password, email } = userData;

            if (!userName || userName.length === 0) {
                return {
                    status: false,
                    message: 'Username is Required'
                };
            }

            if (!password || password.length < 8) {
                return {
                    status: false,
                    message: 'Password must be atleast 8 characters long'
                };
            }

            if (!email || email.length === 0) {
                return {
                    status: false,
                    message: 'Email is Required'
                };
            }

            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            userData.password = hashedPassword;
            
            let user = await this.userService.registerUser(userData);
            return user


        } catch (error) {
            return {
                status: false,
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    
}

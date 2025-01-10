import { Controller, Post, Body, UseGuards, Get,Req,Res, Param,Request } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


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
                    message: 'Password must be at least 8 characters long'
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
            // console.log('user1234567........',userData)
            return await this.userService.registerUser(userData);

        } catch (error) {
            return {
                status: false,
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    @Get('logout')
    async logout(@Req() req, @Res() res: Response) {
        req.logout(() => {
            return res.send({ status: true, message: 'Logged out successfully' });
        });
    }

    @Get('id')
    async GetUser(@Param('id') id : string){
        const user = await this.userService.findById(id);
        if(!user){
            return {
                status : false,
                message : "User Not Found"
            }
        }
        return user
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/user')
    async getProfile(@Request() req){
        return req.user;
    }
}

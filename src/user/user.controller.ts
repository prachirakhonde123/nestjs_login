import { Controller, Post, Body, UseGuards, Get,Req,Res } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
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

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async userLogin(@Req() req): Promise<any> {
        const user = req.user; // User should be set here if authentication is successful
        req.login(user, (err) => {
        if (err) {
            throw err;
        }
        return {
            status: true,
            message: 'User Logged In Successfully',
            user: req.user, // Make sure user is available in the session
        };
     });
    }

    @Get('logout')
    async logout(@Req() req, @Res() res: Response) {
        req.logout(() => {
            return res.send({ status: true, message: 'Logged out successfully' });
        });
    }

    @Get('session')
    async getSession(@Req() req): Promise<any> {
        console.log('inside session...');
        console.log('session user is 121321...',req.user)
        if (req.isAuthenticated()) {
            console.log('User is authenticated:', req.user);
            return { status: true, user: req.user };
        } else {
            console.log('User is not authenticated');
            return { status: false, message: 'Not authenticated' };
        }
    }
}

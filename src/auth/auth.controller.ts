import { Controller, Post, Body, Req, UnauthorizedException, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

    @Post('login')
    async login(@Body() user : {userName : string, password : string}){
        let getUser = await this.authService.ValidateUser(user.userName, user.password);
        // console.log('get user is..',getUser)
        if(getUser.status === false){
            return {
                status : false,
                message : getUser.message
            }
        }
        const loginResponse = await this.authService.login(getUser);
        return loginResponse;
    }

    @Post('logout')
    logout(@Req() req: any) {
     console.log('req user is...',req.user)
      req.user = null; 
      return { message: 'Logged out successfully' };
    }
}
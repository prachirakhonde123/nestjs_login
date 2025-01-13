import { Controller, Post, Body, Req, UnauthorizedException, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

    @Post('login')
    // @UseGuards(JwtAuthGuard)
    async login(@Body() user : {userName : string, password : string}){
        console.log('user is....1',user.userName)
        let getUser = await this.authService.ValidateUser(user.userName, user.password);
        console.log('getUser iss....',getUser)
        if(getUser.status === false){
            return {
                status : false,
                error : getUser.message
            }
        }
        // if(getUser){
            const loginResponse = await this.authService.login(getUser);
            return loginResponse;
            // this.authService.login;
        // }
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() req: any) {
     console.log('req user is...',req.user)
      req.user = null; 
      return { message: 'Logged out successfully' };
    }
}
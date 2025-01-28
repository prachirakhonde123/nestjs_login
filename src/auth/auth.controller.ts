import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController{
    constructor(
        private authService : AuthService
    ){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto : AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto : AuthCredentialsDto):Promise<{accessToken : string}>{
        return this.authService.signIn(authCredentialsDto)
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())  // By using this we are protecting our route /test. Without passing jwt token, it will throw error
    // test(@Req() req){
    //    console.log(req)
    // }

}

/*
To make the route protected need to use UseGuard
*/
import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService : AuthService,
        private readonly userService : UserService
    ) {}

    @Post('login')
    async login(@Request() req) : Promise<any>{
        const user = req.user;
        const token = await this.authService.login(user);
        return {token}
    }

    @Post('register')
    async registerUser(@Request() req):Promise<any>{
       const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
       }
       const user = await this.userService.registerUser(userData);
       return user;
    }
}
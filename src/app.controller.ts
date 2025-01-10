import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(@Request() req){
    return req.user;
  }
}

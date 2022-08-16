import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return req.user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

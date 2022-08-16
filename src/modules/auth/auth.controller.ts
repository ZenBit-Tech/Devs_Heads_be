import { Body, Controller, Get, Request, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, TokenTypes } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto): any {
    return this.authService.signUp(authDto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@Request() req) {
    console.log(req);
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    /* return this.authService.googleSignUp(req);*/
  }
}

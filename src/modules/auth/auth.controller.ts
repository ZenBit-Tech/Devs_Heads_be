import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, TokenTypes } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto): Promise<User> {
    return this.authService.signUp(authDto);
  }
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto): Promise<TokenTypes> {
    return this.authService.signIn(authDto);
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleSignUp(req);
  }
}

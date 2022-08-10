import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, TokenTypes } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly feedbackService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto): Promise<User> {
    return this.feedbackService.signUp(authDto);
  }
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto): Promise<TokenTypes> {
    return this.feedbackService.signIn(authDto);
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {
    console.log(req);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.feedbackService.googleSignUp(req);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly feedbackService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto): Promise<User> {
    return this.feedbackService.signUp(authDto);
  }
}

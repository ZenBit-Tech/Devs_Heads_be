import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from '../sign-up/sign-up.service';
import { SignUpDto } from '../sign-up/dto/sign-up.dto';
import { SignUp } from '../entities/signUp.entity';
import { SignInService } from './sign-in.service';
import { SignIn } from '../sign-in';

  @Controller('signIn')
export class SignInController {
  constructor(private readonly feedbackService: SignInService) {}

  @Post()
  signIn(@Body() createMessageDTO: SignUpDto): Promise<SignIn> {
    return this.feedbackService.signIn(createMessageDTO);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUp } from '../entities/signUp.entity';

@Controller('signUp')
export class SignUpController {
  constructor(private readonly feedbackService: SignUpService) {}
  @Post()
  signUp(@Body() createMessageDTO: SignUpDto): Promise<SignUp> {
    return this.feedbackService.signUp(createMessageDTO);
  }
}

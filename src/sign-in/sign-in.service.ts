import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUp } from '../entities/signUp.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(SignUp)
    private usersRepository: Repository<SignUp>,
  ) {}

  async signIn(@Body() createMessageDTO: SignInDto): Promise<any> {
    const { password, email } = createMessageDTO;
  }
}

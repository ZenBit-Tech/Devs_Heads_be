import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUp } from '../entities/signUp.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class SignUpService {
  private id: any;

  constructor(
    @InjectRepository(SignUp)
    private usersRepository: Repository<SignUp>,
  ) {}

  async signUp(@Body() createMessageDTO: SignUpDto): Promise<any> {
    const { password, email } = createMessageDTO;
    const isUsed = await this.usersRepository.findOneBy({ email });

    if (isUsed) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This email already exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    return await this.usersRepository.save({ email, password: hashedPassword });
  }
}

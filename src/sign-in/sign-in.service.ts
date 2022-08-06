import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUp } from '../entities/signUp.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignIn } from '../sign-in';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(SignUp)
    private usersRepository: Repository<SignIn>,
  ) {}

  async signIn(@Body() createMessageDTO: SignInDto): Promise<any> {
    const { email, password } = createMessageDTO;
    const user: any = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No such account',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = bcrypt.compareSync(password, user.password); // unhash password
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    return { token, userId: user.id };
  }
}

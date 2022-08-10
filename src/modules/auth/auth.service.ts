import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto, TokenTypes } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(@Body() AuthDto: AuthDto): Promise<User> {
    const { password, email } = AuthDto;
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
    return await this.usersRepository.save({ email, password: hashedPassword, googleId: null });
  }

  async signIn(@Body() AuthDto: AuthDto): Promise<TokenTypes> {
    const { email, password } = AuthDto;
    const user: User = await this.usersRepository.findOneBy({ email });

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

  async googleSignUp(req) {
    const { googleId, email } = req.user;
    const user = await this.usersRepository.findOneBy({ googleId });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This email already exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.save({ email, googleId });

  }
}

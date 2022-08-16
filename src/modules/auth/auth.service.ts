import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private readonly jwtService: JwtService) {}

  async signUp(@Body() AuthDto: AuthDto): Promise<User> {
    const { password, email } = AuthDto;
    const isUsed = await this.usersService.findOne(email);
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
    return await this.usersService.save({ email, password: hashedPassword, googleId: null });
  }

  async validateUser({ email, password }): Promise<Pick<User, 'id' | 'email' | 'googleId'>> {
    const user = await this.usersService.findOne(email);
    console.log(user, 'user');
    if (user && user.password) {
      const isMatch = bcrypt.compareSync(password, user.password);
      console.log(isMatch, 'isMatch');
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Incorrect password',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return null;
  }

  async signIn(@Body() user): Promise<{ token: string; userId: string }> {
    console.log(user);
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    return { token, userId: user.id };
  }

  async googleSignUp(req) {
    const { googleId, email } = req.user;

    const user = await this.usersService.findOne(googleId);
    if (user) return this.googleSignIn(user);
    console.log(req);
    const newUser = await this.usersService.save({ email, password: null, googleId });
    return this.googleSignIn(newUser);
  }

  async googleSignIn(user): Promise<{ token: string; userId: string }> {
    return {
      token: this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRE_TIME,
        },
      ),
      userId: user.id,
    };
  }
}

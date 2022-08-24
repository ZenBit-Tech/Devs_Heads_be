import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ForgotPassword } from '../../entities/forgot-password.entity';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), TypeOrmModule.forFeature([User, ForgotPassword])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

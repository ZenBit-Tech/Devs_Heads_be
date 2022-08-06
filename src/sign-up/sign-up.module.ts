import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpController } from './sign-up.controller';
import { SignUp } from '../entities/signUp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SignUp])],
  providers: [SignUpService],
  controllers: [SignUpController],
})
export class SignUpModule {}

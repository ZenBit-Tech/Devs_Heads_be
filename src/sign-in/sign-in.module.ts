import { Module } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInController } from './sign-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUp } from '../entities/signUp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SignUp])],
  providers: [SignInService],
  controllers: [SignInController],
})
export class SignInModule {}

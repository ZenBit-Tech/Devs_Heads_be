import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';

@Module({
  providers: [SignUpService],
})
export class SignUpModule {}

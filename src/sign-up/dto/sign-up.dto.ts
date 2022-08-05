import { IsString,IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

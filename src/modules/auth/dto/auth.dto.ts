import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  googleId: string;
}

export interface TokenTypes {
  token: string;
  userId: number;
}

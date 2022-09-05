import { IsString, IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  googleId: string;

  role: string;
}

export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}

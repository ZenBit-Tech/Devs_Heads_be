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
}

export interface TokenTypes {
  token: string;
  userId: number;
}

import { IsString, IsNotEmpty, IsEmail, isNumber } from 'class-validator';

export class UpdateDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
  googleId: string;

  @IsNotEmpty()
  userId: number;
}

export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}

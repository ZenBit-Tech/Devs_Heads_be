import { IsString, IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  role: string;
  googleId: string;
}
export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}

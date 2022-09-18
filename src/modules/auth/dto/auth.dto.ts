import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ProfileEntity } from 'src/entities/profile/profile.entity';

export class AuthDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  user?: number;
  userId?: ProfileEntity;
  password?: string;
  role?: string;
  googleId?: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}

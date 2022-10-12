import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ClientSettingsEntity } from 'src/entities/clientSetttings.entity';

export class AuthDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  userId?: number;
  clientInfo: ClientSettingsEntity;
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

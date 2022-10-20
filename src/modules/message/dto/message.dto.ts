import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  jobLink?: string;
  @IsNumber()
  chatRoomId: number;

  @IsNumber()
  userId: number;

  @IsString()
  text: string;
}

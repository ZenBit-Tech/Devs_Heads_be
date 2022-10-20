import { IsNumber } from 'class-validator';

export class ChatRoomDto {
  activeRoom: boolean;
  @IsNumber()
  jobPostId: number;

  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;
}

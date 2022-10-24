import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChatRoomDto {
  @ApiProperty({ example: 'true', description: 'Status of active room or not' })
  activeRoom: boolean;

  @ApiProperty({ example: 1, description: 'Job post id' })
  @IsNumber()
  jobPostId: number;

  @ApiProperty({ example: 1, description: 'Id of sender' })
  @IsNumber()
  senderId: number;

  @ApiProperty({ example: 1, description: 'Id of recipient' })
  @IsNumber()
  receiverId: number;
}

import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomDto } from './dto/chat-room.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @Post()
  createRoom(@Body() data: ChatRoomDto): Promise<ChatRoom> {
    return this.chatRoomService.createRoom(data);
  }

  @Patch(':id')
  updateRoom(@Param('id') id: number, @Body() data: Partial<ChatRoomDto>): Promise<ChatRoom> {
    return this.chatRoomService.updateRoom(Number(id), data);
  }

  @Get()
  getAll() {
    return this.chatRoomService.getAll();
  }

  @Get(':id')
  getChatRoomsByUserId(@Param('id') id: number) {
    return this.chatRoomService.getChatRoomsByUserId(Number(id));
  }
  @Get(':senderId/:receiverId/:jobPostId')
  getChatRoomsByTwoUserId(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
    @Param('jobPostId') jobPostId: number,
  ) {
    return this.chatRoomService.getChatRoomsByTwoUserId(Number(senderId), Number(receiverId), Number(jobPostId));
  }
}

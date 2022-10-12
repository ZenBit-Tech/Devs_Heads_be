import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Message } from 'src/entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(@Body() data: MessageDto): Promise<Message> {
    return this.messageService.createMessage(data);
  }

  @Get(':id')
  getAll(@Param('id') id: number) {
    return this.messageService.getAllByRoomId(Number(id));
  }
}

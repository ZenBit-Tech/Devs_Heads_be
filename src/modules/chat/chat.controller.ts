import { Controller, Body } from '@nestjs/common';
import { Post } from '@overnightjs/core';
import { Chat } from 'src/entities/chat.entity';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createMessage(@Body() message: ChatDto): Promise<Chat> {
    return this.chatService.createMessage(message);
  }
}

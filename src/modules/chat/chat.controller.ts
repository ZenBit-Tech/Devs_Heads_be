import { Controller, Body, Post, Get } from '@nestjs/common';
import { Chat } from 'src/entities/chat.entity';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getMessages() {
    return this.chatService.getMessages();
  }
}

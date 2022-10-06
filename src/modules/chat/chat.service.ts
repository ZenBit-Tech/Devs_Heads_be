import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private chatRepository: Repository<Chat>) {}
  cleintToUser = {};

  async createMessage(message: ChatDto): Promise<Chat> {
    try {
      return await this.chatRepository.save(message);
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }

  async identify(email: string, clientId: string) {
    this.cleintToUser[clientId] = email;
    return Object.values(this.cleintToUser);
  }
  async getClientEmail(clientId: string) {
    return this.cleintToUser[clientId];
  }
}

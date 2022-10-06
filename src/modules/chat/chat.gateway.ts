import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway(5009, { cors: '*' })
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: ChatDto): Promise<void> {
    await this.chatService.createMessage(message);
    console.log(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('email') email: string, @ConnectedSocket() client: Socket) {
    return this.chatService.identify(email, client.id);
  }
}

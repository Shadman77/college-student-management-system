import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'connected');
      socket.join('students');
      console.log(socket.id, 'connected to room:', socket.rooms);
    });
  }

  @SubscribeMessage('ping')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('pong', '');
  }
}

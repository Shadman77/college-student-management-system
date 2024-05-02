import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketGateway } from '../socket';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  emitToRoom(roomName: string, eventName: string, eventData: any) {
    const server = this.socketGateway.server;
    server.to(roomName).emit(eventName, eventData);
  }
}
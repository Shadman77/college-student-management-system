import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketGateway } from '../socket';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  emitToAll(eventName: string, eventData: any) {
    const server: Server = this.socketGateway.server;
    server.emit(eventName, eventData);
  }
}
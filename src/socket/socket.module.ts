import { Module } from '@nestjs/common';
import { SocketGateway } from './socket';
import { SocketService } from './services/socket.service';

@Module({ providers: [SocketGateway, SocketService], exports: [SocketService] })
export class SocketModule {}

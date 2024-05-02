import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from '../socket/socket.module';
import { UserSchema } from './schemas/user.schema';
import { UserSeederService } from './services/users-seeder.service';
import { UserService } from './services/users.service';

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    SocketModule
  ],
  providers: [UserSeederService, UserService],
})
export class UsersModule {}

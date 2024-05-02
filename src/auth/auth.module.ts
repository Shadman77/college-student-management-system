import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'your-secret-key', // Make sure to replace this with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if you need to use it in other modules
})
export class AuthModule {}
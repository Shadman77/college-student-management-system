import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { LocalAuthGuard } from '../guard/local.auth.guard';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

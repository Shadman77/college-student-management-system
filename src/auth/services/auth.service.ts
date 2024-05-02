import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await comparePassword(password, user.password))) {
      // Omitting sensitive data from the token payload for security
      const result = { email: user.email, role: user.role };
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const validatedUser = await this.validateUser(email, password);
    console.log(validatedUser);
    if (!validatedUser) throw new UnauthorizedException('Invalid credentials');
    return {
      accessToken: this.jwtService.sign(validatedUser),
    };
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}

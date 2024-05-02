import { Injectable } from '@nestjs/common';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    const usersToCreate = [
      { email: 'admin@example.com', password: 'adminpassword', role: 'admin' },
      { email: 'user@example.com', password: 'userpassword', role: 'user' },
    ];

    for (const user of usersToCreate) {
      const existingUser = await this.userService.findByEmail(user.email);
      if (!existingUser) {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        await this.userService.create({ ...user, password: hashedPassword });
      }
    }
  }
}

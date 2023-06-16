import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | any> {
    const user = await this.usersService.findOne(username);

    if (user !== null) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      name: user.name,
      email: user.email,
      username: user.username,
      sub: user.id,
    };

    return {
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }
}

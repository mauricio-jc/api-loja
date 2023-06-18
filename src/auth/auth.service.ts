import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | any> {
    const user = await this.usersService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // async loginRequest(body: any): Promise<void> {
  //   if (
  //     !body.hasOwnProperty('username') ||
  //     body.username === null ||
  //     body.username === ''
  //   ) {
  //     throw new BadRequestException({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: 'Preencha o campo usuário',
  //     });
  //   }

  //   if (
  //     !body.hasOwnProperty('password') ||
  //     body.password === null ||
  //     body.password === ''
  //   ) {
  //     throw new BadRequestException({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: 'Preencha o campo senha',
  //     });
  //   }
  // }

  async login(user: any): Promise<any> {
    const payload = {
      name: user.name,
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

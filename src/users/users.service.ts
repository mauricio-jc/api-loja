import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async all(): Promise<User | any> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao buscar os usuários.',
        error: error.message,
      });
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const userCreated = this.userRepository.save(createUserDto);
      return userCreated;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar o usuário.',
        error: error.message,
      });
    }
  }
}

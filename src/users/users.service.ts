import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
        message: 'Falha na requisição',
        error: error.name,
      });
    }
  }

  async findOneById(id: number): Promise<User | undefined | any> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) {
      if (error.response.statusCode == 400) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Falha na requisição',
          error: error.name,
        });
      }

      if (error.response.statusCode == 404) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuário não encontrado',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.name,
      });
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined | any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) {
      if (error.response.statusCode == 400) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Falha na requisição',
          error: error.name,
        });
      }

      if (error.response.statusCode == 404) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuário não encontrado',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.name,
      });
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    try {
      if (await this.findByEmailCreate(createUserDto.email)) {
        throw new BadRequestException();
      }
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const userCreated = this.userRepository.save(createUserDto);
      return userCreated;
    } catch (error) {
      if (error.response.statusCode == 400) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'E-mail já cadastrado no banco de dados',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar o usuário',
        error: error.message,
      });
    }
  }

  async findByEmailCreate(email: string): Promise<boolean> {
    try {
      const exist = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (exist === null) {
        return false;
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar o usuário',
        error: error.message,
      });
    }
  }

  async getRoles(id: number): Promise<any> {
    try {
      return await this.userRepository.findOne({
        where: {
          id: id,
        },
        select: ['roles'],
      });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.message,
      });
    }
  }
}

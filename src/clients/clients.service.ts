import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async all(): Promise<Client[] | any> {
    try {
      return await this.clientRepository.find({
        order: {
          name: 'ASC',
        },
      });

      // return await this.clientRepository
      //   .createQueryBuilder('clients')
      //   .where('clients.id In(:id)', { id: [1, 2] })
      //   .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createClientDto: CreateClientDto): Promise<Client | any> {
    try {
      return await this.clientRepository.save(createClientDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: number,
    createClientDto: CreateClientDto,
  ): Promise<Client | any> {
    try {
      // return await this.dataSource.query(
      //   `UPDATE adjustpoint set status_id = '${StatusType.Adjusted}' WHERE id in (17,18)`,
      // );

      // return await this.clientRepository
      //   .createQueryBuilder('clients')
      //   .update(Client)
      //   .set({
      //     age: 18,
      //   })
      //   .where('clients.id In(:id)', { id: [1, 2] })
      //   .execute();

      return await this.clientRepository.update(id, createClientDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

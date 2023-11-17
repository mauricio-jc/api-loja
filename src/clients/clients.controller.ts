import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async listAll(): Promise<Client[] | any> {
    return await this.clientsService.all();
  }

  @Post('create')
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client | any> {
    return await this.clientsService.create(createClientDto);
  }

  @Put('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client | any> {
    return await this.clientsService.update(Number(id), createClientDto);
  }
}

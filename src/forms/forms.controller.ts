import { Controller, Get } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.formsService.findAll();
  }

  @Get('/is-admin')
  async isAdmin(): Promise<boolean> {
    return await this.formsService.isAdmin();
  }
}

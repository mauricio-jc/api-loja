import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { FormAdmin } from './entities/form_admin.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
    @InjectRepository(FormAdmin)
    private formAdminRepository: Repository<FormAdmin>,
  ) {}

  async findAll(): Promise<any> {
    try {
      if (await this.isAdmin()) {
        return await this.formRepository.find();
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      throw error;
    }
  }

  async isAdmin(): Promise<boolean> {
    try {
      const exist = await this.formAdminRepository.findOne({
        where: {
          user: {
            id: 1,
          },
        },
      });

      if (exist) {
        return true;
      }

      return false;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

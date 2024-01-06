import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendMail(createMailDto: CreateMailDto): Promise<any> {
    try {
      return await this.mailerService.sendMail({
        to: this.configService.get<string>('MAIL_TO'),
        from: createMailDto.email,
        subject: createMailDto.subject,
        html: `<!DOCTYPE html><html lang="pt-BT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><h1>Contato enviado</h1><hr><p>Nome: ${createMailDto.name}</p><p>E-mail: ${createMailDto.email}</p><p>Assunto: ${createMailDto.subject}</p><p>Mensagem: ${createMailDto.message}</p></body></html>`,
      });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao tentar enviar o e-mail',
        error: error,
      });
    }
  }
}

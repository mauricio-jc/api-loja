import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mail')
@UseGuards(JwtAuthGuard)
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() createMailDto: CreateMailDto): Promise<any> {
    return this.mailService.sendMail(createMailDto);
  }
}

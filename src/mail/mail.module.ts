import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailConfigService } from 'src/config/mail.config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
      inject: [MailConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

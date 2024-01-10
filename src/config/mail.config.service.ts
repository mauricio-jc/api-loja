import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      // transport: {
      //   host: this.configService?.get<string>('MAIL_HOST'),
      //   secure: false,
      //   port: this.configService?.get<number>('MAIL_PORT'),
      //   auth: {
      //     user: this.configService?.get<string>('MAIL_USERNAME'),
      //     pass: this.configService?.get<string>('MAIL_PASSWORD'),
      //   },
      //   ignoreTLS: true,
      // },
      // defaults: {
      //   from: '',
      // },
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '',
      },
    };
  }
}

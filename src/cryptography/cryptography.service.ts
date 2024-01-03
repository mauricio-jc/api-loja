import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptographyService {
  initVector = createHash('sha512')
    .update(this.configService.get<string>('SECRET_KEY'))
    .digest('hex')
    .substring(0, 16);

  constructor(private configService: ConfigService) {}

  encrypt(request: any) {
    const cipher = createCipheriv(
      'aes256',
      this.configService.get<string>('SECRET_KEY'),
      this.initVector,
    );
    const passwordCrypt = Buffer.from(
      cipher.update(request.password, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');

    return {
      passwordCrypt: passwordCrypt,
      password: request.password,
    };
  }

  decrypt(request: any) {
    const buff = Buffer.from(request.passwordCrypt, 'base64');
    const decipher = createDecipheriv(
      'aes256',
      this.configService.get<string>('SECRET_KEY'),
      this.initVector,
    );
    const passwordDecrypt =
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8');

    return {
      passwordCrypt: request.passwordCrypt,
      passwordDecrypt: passwordDecrypt,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptographyService {
  // initVector = randomBytes(16);

  // key = createHash('sha512')
  //   .update(this.configService.get<string>('SECRET_KEY'))
  //   .digest('hex')
  //   .substring(0, 32);
  initVector = createHash('sha512')
    .update(this.configService.get<string>('SECRET_KEY'))
    .digest('hex')
    .substring(0, 16);

  constructor(private configService: ConfigService) {}

  // encrypt(request: any): any {
  //   const cipher = createCipheriv(
  //     'aes256',
  //     this.configService.get<string>('SECRET_KEY'),
  //     this.initVector,
  //   );
  //   let passwordCrypt = cipher.update(request.password, 'utf-8', 'hex');
  //   passwordCrypt += cipher.final('hex');
  //   console.log(this.initVector);

  //   return {
  //     passwordCrypt: passwordCrypt,
  //     password: request.password,
  //   };
  // }

  // decrypt(request: any): any {
  //   const decipher = createDecipheriv(
  //     'aes256',
  //     this.configService.get<string>('SECRET_KEY'),
  //     this.initVector,
  //   );

  //   let passwordDecrypt = decipher.update(
  //     request.passwordCrypt,
  //     'hex',
  //     'utf-8',
  //   );

  //   passwordDecrypt += decipher.final('utf8');

  //   return {
  //     passwordCrypt: request.passwordCrypt,
  //     passwordDecrypt: passwordDecrypt,
  //   };
  // }

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

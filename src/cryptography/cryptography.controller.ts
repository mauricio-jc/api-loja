import { Controller, Post, Body } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';

@Controller('cryptography')
export class CryptographyController {
  constructor(private cryptographyService: CryptographyService) {}

  @Post('/encrypt')
  encrypt(@Body() request: string): any {
    return this.cryptographyService.encrypt(request);
  }

  @Post('/decrypt')
  decrypt(@Body() request: any): any {
    return this.cryptographyService.decrypt(request);
  }
}

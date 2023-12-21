import { Module } from '@nestjs/common';
import { CryptographyService } from './cryptography.service';
import { CryptographyController } from './cryptography.controller';

@Module({
  controllers: [CryptographyController],
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}

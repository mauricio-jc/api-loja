import { IsNumber, IsOptional } from 'class-validator';

export class BasePaginateFilterDto {
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  limit: number = 2;
}

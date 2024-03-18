import { IsOptional, IsString } from 'class-validator';
import { BasePaginateFilterDto } from 'src/commons/base-paginate-filter.dto';

export class FilterCategoryDto extends BasePaginateFilterDto {
  @IsOptional()
  @IsString()
  name: string;
}

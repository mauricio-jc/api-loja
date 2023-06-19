import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Preencha o campo nome',
  })
  @IsString({
    message: 'O nome precisa ser um texto',
  })
  name: string;
}

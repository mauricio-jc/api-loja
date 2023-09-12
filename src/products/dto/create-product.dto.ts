import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'Preencha o campo nome',
  })
  @IsString({
    message: 'O campo nome precisa ser do tipo texto',
  })
  name: string;

  @IsNotEmpty({
    message: 'Preencha o campo preço',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message:
        'O preço deve ser um número em conformidade com as restrições especificadas',
    },
  )
  @IsPositive({
    message: 'O preço não pode ser menor que zero',
  })
  @Min(0, {
    message: 'O preço não pode ser menor que zero',
  })
  price: number;

  @IsNotEmpty({
    message: 'Informa a quantidade',
  })
  @IsInt({
    message: 'A quantidade deve ser um número inteiro',
  })
  @IsPositive({
    message: 'A quantidade não pode ser menor que zero',
  })
  @Min(0, {
    message: 'A quantidade não pode ser menor que zero',
  })
  quantity: number;

  @IsNotEmpty({
    message: 'Preencha o campo descrição',
  })
  @IsString({
    message: 'O campo descrição precisa ser do tipo texto',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe a categoria',
  })
  category_id: number;

  @IsOptional()
  change_image1?: string;

  @IsOptional()
  change_image2?: string;
}

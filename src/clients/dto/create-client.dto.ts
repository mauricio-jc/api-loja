import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({
    message: 'Preencha o campo nome',
  })
  @IsString({
    message: 'O nome precisa ser um texto',
  })
  name: string;

  @IsNotEmpty({
    message: 'Preencha o campo e-mail',
  })
  @IsString({
    message: 'O e-mail precisa ser um texto',
  })
  email: string;

  @IsNotEmpty({
    message: 'Preencha o campo telefone',
  })
  @IsString({
    message: 'O telefone precisa ser um texto',
  })
  phone: string;

  @IsNotEmpty({
    message: 'Preencha o campo documento',
  })
  @IsString({
    message: 'O documento precisa ser um texto',
  })
  document: string;

  @IsNotEmpty({
    message: 'Preencha o campo idade',
  })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: 'A idade deve ser um número inteiro',
    },
  )
  @IsPositive({
    message: 'A idade não pode ser menor que zero',
  })
  @Min(0, {
    message: 'A idade não pode ser menor que zero',
  })
  age: number;
}

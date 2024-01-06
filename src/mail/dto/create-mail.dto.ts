import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty({
    message: 'Informe seu nome',
  })
  @IsString({
    message: 'O nome tem que ser uma string',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe seu e-mail',
  })
  @IsString({
    message: 'O e-mail tem que ser uma string',
  })
  email: string;

  @IsNotEmpty({
    message: 'Informe o assunto',
  })
  @IsString({
    message: 'O assunto tem que ser uma string',
  })
  subject: string;

  @IsNotEmpty({
    message: 'Escreva uma mensagem',
  })
  @IsString({
    message: 'A mensagem tem que ser uma string',
  })
  message: string;
}

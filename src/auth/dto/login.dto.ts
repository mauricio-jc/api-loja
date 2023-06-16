import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({
    message: 'Preencha o campo usuário',
  })
  username: string;

  @IsNotEmpty({
    message: 'Preencha o campo senha',
  })
  password: string;
}

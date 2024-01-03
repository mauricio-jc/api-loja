import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Preencha o campo nome',
  })
  @IsString({
    message: 'O nome precisa ser um texto',
  })
  name: string;

  @IsNotEmpty({
    message: 'Preencha o campo usuário',
  })
  @IsString({
    message: 'O usuário precisa ser um texto',
  })
  username: string;

  @IsNotEmpty({
    message: 'Preencha o campo e-mail',
  })
  @IsString({
    message: 'O e-mail precisa ser um texto',
  })
  @IsEmail(
    {},
    {
      message: 'E-mail inválido',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Preencha o campo senha',
  })
  @IsString({
    message: 'A senha precisa ser um texto',
  })
  @MinLength(8, {
    message: 'A senha precisa ter no mínimo 8 caracteres',
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsNotEmpty()
  roles: string[];
}

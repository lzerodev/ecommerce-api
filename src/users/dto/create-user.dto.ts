import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Por favor, insira um nome válido' })
  name: string;

  @IsEmail(undefined, { message: 'Por favor, insira um email válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, {
    message:
      'Senha deve conter entre 8 e 16 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  password: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsPhoneNumber('BR', {
    message: 'Por favor, insira um telefone válido, formato +55 11 91234-5678',
  })
  phoneNumber?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'Por favor, insira um nome válido' })
  name: string;

  @IsEmail(undefined, { message: 'Por favor, insira um email válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsPhoneNumber('BR', {
    message: 'Por favor, insira um telefone válido, formato +55 11 91234-5678',
  })
  phoneNumber: string;
}

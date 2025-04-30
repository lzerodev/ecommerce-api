import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: any): Promise<boolean> {
    const userEmailExists = await this.usersService.findByEmail(value);
    return !userEmailExists;
  }
  defaultMessage(): string {
    return 'Email already exists';
  }
}

export const UniqueEmail = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      name: 'UniqueEmail',
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};

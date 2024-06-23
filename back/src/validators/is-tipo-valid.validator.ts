import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { tipoEnum } from '../restaurante/tipo.enum';

@ValidatorConstraint({ async: false })
export class IsTipoValidConstraint implements ValidatorConstraintInterface {
  validate(tipo: any, args: ValidationArguments) {
    return Object.keys(tipoEnum).includes(tipo);
  }

  defaultMessage(args: ValidationArguments) {
    const validKeys = Object.keys(tipoEnum).join(', ');
    return `Tipo inválido. Chaves permitidas: ${validKeys}.`;
  }
}

export function IsTipoValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTipoValidConstraint,
    });
  };
}

import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  IsUUID,
  Length,
  Min,
  Max,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { tipoEnum } from './tipo.enum';
import { EntregadorEntity } from '../entregador/entregador.entity';

export class RestauranteDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsInt()
  @Min(1)
  @Max(5)
  avaliacao: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  endereco: string;

  @IsInt()
  @Min(1)
  prazoEntrega: number;

  @IsEnum(tipoEnum, {
    message: 'O tipo de restaurante deve ser apenas P, L, Z, D, B ou O.',
  })
  tipo: tipoEnum;

  @IsArray()
  @IsUUID('4', { each: true })
  entregadores: EntregadorEntity[];
}

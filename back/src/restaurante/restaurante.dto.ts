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
import { EntregadorDto } from '../entregador/entregador.dto';

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
  entregadores: EntregadorDto[];
}

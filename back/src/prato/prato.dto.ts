import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsUUID,
  IsNotEmpty,
  Length,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { proteinaEnum } from './proteina.enum';

export class PratoDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsNumber()
  preco: number;

  @IsEnum(proteinaEnum, {
    message: 'A proteina deve ser apenas G, S, A, M ou O.',
  })
  proteina: proteinaEnum;

  @IsBoolean()
  vegano: boolean;

  @IsInt()
  @Min(0)
  @Max(5)
  avaliacao: number;

  @IsUUID()
  @IsNotEmpty()
  restauranteId: string;
}

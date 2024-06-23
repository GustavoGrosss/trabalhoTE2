import {
  IsString,
  IsDate,
  IsEnum,
  Length,
  IsNotEmpty,
  Validate,
  IsArray,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GeneroEnum } from '../genero.enum';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { veiculoEnum } from './veiculo.enum';
import { IsAdult } from '../validators/is-adult.validator';

export class EntregadorDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsDate()
  @Type(() => Date)
  @Validate(IsAdult, {
    message: 'O entregador deve ter pelo menos 18 anos',
  })
  dataNascimento: Date;

  @IsEnum(GeneroEnum, {
    message: 'O genero deve ser apenas M, F ou I.',
  })
  genero: GeneroEnum;

  @IsString()
  placaVeiculo: string;

  @IsEnum(veiculoEnum, {
    message: 'O tipo de veiculo deve ser apenas C, M ou O.',
  })
  tipoVeiculo: veiculoEnum;

  @IsArray()
  restaurantes: RestauranteEntity[];
}

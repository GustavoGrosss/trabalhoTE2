import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GeneroEnum } from '../genero.enum';
import { veiculoEnum } from './veiculo.enum';
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Entity({ name: 'entregadores' })
export class EntregadorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column({ type: 'enum', enum: GeneroEnum, default: GeneroEnum.INDEFINIDO })
  genero: GeneroEnum;

  @Column({ length: 10, name: 'placa_veiculo' })
  placaVeiculo: string;

  @Column({
    type: 'enum',
    enum: veiculoEnum,
    default: veiculoEnum.MOTO,
    name: 'tipo_veiculo',
  })
  tipoVeiculo: veiculoEnum;

  @ManyToMany(
    () => RestauranteEntity,
    (restaurante) => restaurante.entregadores,
  )
  restaurantes: RestauranteEntity[];
}

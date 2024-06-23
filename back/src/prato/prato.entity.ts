import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { proteinaEnum } from './proteina.enum';
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Entity({ name: 'pratos' })
export class PratoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'float' })
  preco: number;

  @Column({ type: 'enum', enum: proteinaEnum, default: proteinaEnum.GADO })
  proteina: proteinaEnum;

  @Column({ type: 'bool', default: false })
  vegano: boolean;

  @Column({ type: 'integer' })
  avaliacao: number;

  @ManyToOne(() => RestauranteEntity, (restaurante) => restaurante.pratos)
  restaurante: RestauranteEntity;
}

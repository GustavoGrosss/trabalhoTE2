import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { tipoEnum } from './tipo.enum';
import { PratoEntity } from '../prato/prato.entity';
import { EntregadorEntity } from '../entregador/entregador.entity';

@Entity({ name: 'restaurantes' })
export class RestauranteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'integer' })
  avaliacao: number;

  @Column({ length: 100 })
  endereco: string;

  @Column({ type: 'integer', name: 'prazo_entrega' })
  prazoEntrega: number;

  @Column({ type: 'enum', enum: tipoEnum, default: tipoEnum.PRATOS })
  tipo: tipoEnum;

  @OneToMany(() => PratoEntity, (prato) => prato.restaurante)
  pratos: PratoEntity[];

  @ManyToMany(() => EntregadorEntity, (entregador) => entregador.restaurantes)
  @JoinTable({
    name: 'restaurantes_entregadores',
    joinColumn: { name: 'restaurante_id' },
    inverseJoinColumn: { name: 'entregador_id' },
  })
  entregadores: EntregadorEntity[];
}

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EntregadorEntity } from '../entregador/entregador.entity';
import { GeneroEnum } from '../genero.enum';

export class entregadorSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const entregadorRepository = dataSource.getRepository(EntregadorEntity);

    const novoEntregador = entregadorRepository.create({
      nome: 'Leonardo',
      dataNascimento: new Date('1999-07-20'),
      genero: GeneroEnum.MASCULINO,
      placaVeiculo: 'AAAAAAA',
    });

    await entregadorRepository.save(novoEntregador);
  }
}

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EntregadorEntity } from '../entregador/entregador.entity';
import { GeneroEnum } from '../genero.enum';
import { veiculoEnum } from '../entregador/veiculo.enum';
import { EntregadorService } from '../entregador/entregador.service';
import { EntregadorDto } from "../entregador/entregador.dto";

export class entregadorSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    entregadorService: EntregadorService,
  ): Promise<any> {
    const entregadorRepository = dataSource.getRepository(EntregadorEntity);

    await entregadorRepository.insert([
      {
        id: '5751520f-04b6-4777-a70f-6835f6744808',
        nome: 'Leonardo',
        dataNascimento: '1999-07-20',
        genero: 'M',
        placaVeiculo: 'AAAAAAA',
        tipoVeiculo: 'M',
      },
    ]);

    const entregadorData: EntregadorEntity = {
      id: '5751520f-04b6-4777-a70f-6835f6744808',
      nome: 'Leonardo',
      dataNascimento: new Date('1999-07-20'),
      genero: 'M',
      placaVeiculo: 'AAAAAAA',
      tipoVeiculo: 'M',
    };

    const novoEntregador = entregadorRepository.create(entregadorData);

    await entregadorRepository.save(novoEntregador);
  // }
}

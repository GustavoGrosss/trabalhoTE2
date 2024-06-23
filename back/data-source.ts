import { DataSource, DataSourceOptions } from 'typeorm';
import { RestauranteEntity } from './src/restaurante/restaurante.entity';
import { PratoEntity } from './src/prato/prato.entity';
import { EntregadorEntity } from './src/entregador/entregador.entity';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { mainSeeder } from './src/seeds/mainSeeder';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: 'database',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  entities: [RestauranteEntity, PratoEntity, EntregadorEntity],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: true,
  seeds: [mainSeeder],
  seedTracking: false,
  factories: ['src/factories/**/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);

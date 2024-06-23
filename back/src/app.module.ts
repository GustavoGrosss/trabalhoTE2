import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from '../data-source';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PratoModule } from './prato/prato.module';
import { EntregadorModule } from './entregador/entregador.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true
    }),
    RestauranteModule,
    PratoModule,
    EntregadorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

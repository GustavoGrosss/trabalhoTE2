import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PratoEntity } from './prato.entity';
import { PratoService } from './prato.service';
import { PratoController } from './prato.controller';
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PratoEntity, RestauranteEntity])],
  providers: [PratoService],
  controllers: [PratoController],
})
export class PratoModule {}

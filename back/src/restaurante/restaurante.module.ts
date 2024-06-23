import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { RestauranteEntity } from './restaurante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity])],
  providers: [RestauranteService],
  controllers: [RestauranteController],
})
export class RestauranteModule {}

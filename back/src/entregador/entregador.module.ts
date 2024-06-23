import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregadorEntity } from './entregador.entity';
import { EntregadorController } from './entregador.controller';
import { EntregadorService } from './entregador.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntregadorEntity])],
  controllers: [EntregadorController],
  providers: [EntregadorService],
})
export class EntregadorModule {}

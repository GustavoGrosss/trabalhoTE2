import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntregadorEntity } from './entregador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntregadorDto } from './entregador.dto';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(EntregadorEntity)
    private entregadorRepository: Repository<EntregadorEntity>,
  ) {}

  async findAll() {
    return this.entregadorRepository.find({
      relations: { restaurantes: true },
    });
  }

  async findById(id: string): Promise<EntregadorEntity> {
    const findOne = await this.entregadorRepository.findOne({
      where: { id },
      relations: { restaurantes: true },
    });
    if (!findOne) {
      throw new NotFoundException('Entregador não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.entregadorRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: EntregadorDto) {
    const newEntregador = this.entregadorRepository.create(dto);

    this.validateEntregador(newEntregador);

    return this.entregadorRepository.save(newEntregador);
  }

  async update(dto: EntregadorDto) {
    await this.findById(dto.id);

    this.validateEntregador(dto);

    return this.entregadorRepository.save(dto);
  }

  private validateEntregador(entregador: EntregadorEntity | EntregadorDto) {
    this.validateEntregadorNascimento(entregador);
    this.validatePlacaVeiculo(entregador);
    this.validateRestaurantes(entregador);
  }

  private validateEntregadorNascimento(
    entregador: EntregadorEntity | EntregadorDto,
  ) {
    const dataAtual = new Date();
    const dataNascimento = new Date(entregador.dataNascimento);
    const diferencaAno =
      dataAtual.getUTCFullYear() - dataNascimento.getUTCFullYear();
    if (diferencaAno < 18) {
      throw new BadRequestException('O entregador deve ter no mínimo 18 anos');
    } else if (diferencaAno === 18) {
      const meses = dataAtual.getUTCMonth() - dataNascimento.getUTCMonth();
      if (meses < 0) {
        throw new BadRequestException(
          `O entregador deve ter no mínimo 18 anos (faltam ainda ${-meses} mes(es))`,
        );
      } else if (meses === 0) {
        const dias = dataAtual.getUTCDate() - dataNascimento.getUTCDate();
        if (dias < 0) {
          throw new BadRequestException(
            `O entregador deve ter no mínimo 18 anos (faltam ainda ${-dias} dia(s))`,
          );
        }
      }
    }
  }

  private validatePlacaVeiculo(entregador: EntregadorEntity | EntregadorDto) {
    const regex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
    if (!regex.test(entregador.placaVeiculo)) {
      throw new BadRequestException(
        'A placa do veículo deve ter 7 caracteres no formato correto (APENAS NÚMEROS E LETRAS)',
      );
    }
  }

  private validateRestaurantes(entregador: EntregadorEntity | EntregadorDto) {
    if (!entregador.restaurantes.length) {
      throw new BadRequestException(
        'Pelo menos um restaurante deve ser enviado',
      );
    }
  }
}

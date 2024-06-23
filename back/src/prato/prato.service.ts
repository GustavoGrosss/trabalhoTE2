import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PratoEntity } from './prato.entity';
import { PratoDto } from './prato.dto';
import { RestauranteEntity } from '../restaurante/restaurante.entity';

@Injectable()
export class PratoService {
  constructor(
    @InjectRepository(PratoEntity)
    private pratoRepository: Repository<PratoEntity>,
    @InjectRepository(RestauranteEntity)
    private restauranteRepository: Repository<RestauranteEntity>,
  ) {}

  async findAll() {
    return this.pratoRepository.find({
      relations: { restaurante: true },
    });
  }

  async findById(id: string): Promise<PratoEntity> {
    const findOne = await this.pratoRepository.findOne({
      where: { id },
      relations: { restaurante: true },
    });
    if (!findOne) {
      throw new NotFoundException('Prato não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.pratoRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PratoDto) {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: dto.restauranteId },
    });

    if (!restaurante) {
      throw new NotFoundException(
        'Restaurante não encontrado com o id ' + dto.restauranteId,
      );
    }

    const newPrato = this.pratoRepository.create({
      ...dto,
      restaurante,
    });

    return this.pratoRepository.save(newPrato);
  }

  async update(id: string, dto: PratoDto) {
    const prato = await this.findById(id);

    const restaurante = await this.restauranteRepository.findOne({
      where: { id: dto.restauranteId },
    });

    if (!restaurante) {
      throw new NotFoundException(
        'Restaurante não encontrado com o id ' + dto.restauranteId,
      );
    }

    Object.assign(prato, dto, { restaurante });

    return this.pratoRepository.save(prato);
  }
}

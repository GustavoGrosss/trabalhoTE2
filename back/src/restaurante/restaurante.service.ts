import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteDto } from './restaurante.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private restauranteRepository: Repository<RestauranteEntity>,
  ) {}

  findAll() {
    return this.restauranteRepository.find({
      relations: ['pratos', 'entregadores'],
    });
  }

  async findById(id: string): Promise<RestauranteEntity> {
    const findOne = await this.restauranteRepository.findOne({
      where: { id },
      relations: ['pratos', 'entregadores'],
    });
    if (!findOne) {
      throw new NotFoundException('Restaurante não encontrado com o id ' + id);
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.restauranteRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: RestauranteDto) {
    const newRestaurante = this.restauranteRepository.create({
      ...dto,
    });

    return this.restauranteRepository.save(newRestaurante);
  }

  async update(dto: RestauranteDto) {
    const existingRestaurante = await this.findById(dto.id);

    const updatedRestaurante = this.restauranteRepository.create({
      ...existingRestaurante,
      ...dto,
    });

    return this.restauranteRepository.save(updatedRestaurante);
  }
}

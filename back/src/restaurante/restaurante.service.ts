import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteDto } from './restaurante.dto';
import { tipoEnum } from './tipo.enum';

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
    const newRestaurante = this.restauranteRepository.create(dto);

    this.validatePrazo(newRestaurante);
    this.validateNome(newRestaurante);
    this.validateVeganoProteina(newRestaurante);

    return this.restauranteRepository.save(newRestaurante);
  }

  async update(dto: RestauranteDto) {
    const existingRestaurante = await this.findById(dto.id);

    const updatedRestaurante = this.restauranteRepository.create({
      ...existingRestaurante,
      ...dto,
    });

    this.validatePrazo(updatedRestaurante);
    this.validateNome(updatedRestaurante);
    this.validateVeganoProteina(updatedRestaurante);

    return this.restauranteRepository.save(updatedRestaurante);
  }

  private validatePrazo(restaurante: RestauranteEntity) {
    if (restaurante.prazoEntrega < 10) {
      throw new BadRequestException(
        'Os artigos 37 e 67 do Código de defesa do Consumidor descrevem o creme e as punições para propaganda enganosa, o que consideramos ser com prazo de entrega inferior a 10 minutos.',
      );
    }
  }

  private async validateNome(restaurante: RestauranteEntity) {
    const restaurantes = await this.findAll();

    const validade = restaurantes.find(
      (r) => r.nome === restaurante.nome && r.id !== restaurante.id,
    );

    if (!!validade) {
      throw new BadRequestException('LPI, a Lei n.º 9.279/96');
    }
  }

  private validateVeganoProteina(restaurante: RestauranteEntity) {
    if (restaurante.tipo !== tipoEnum.BEBIDAS && restaurante.avaliacao == 5) {
      throw new BadRequestException(
        'Impossivel um restaurante ser otimo se não for de bebidas!',
      );
    }
  }
}

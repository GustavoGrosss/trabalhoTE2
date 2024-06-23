import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { RestauranteDto } from './restaurante.dto';

@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const restaurante = await this.restauranteService.findById(id);
    if (!restaurante) {
      throw new NotFoundException('Restaurante não encontrado');
    }
    return restaurante;
  }

  @Post()
  create(@Body(new ValidationPipe()) dto: RestauranteDto) {
    return this.restauranteService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: RestauranteDto,
  ) {
    const restaurante = await this.restauranteService.findById(id);
    if (!restaurante) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    return this.restauranteService.update({ id, ...dto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restauranteService.remove(id);
  }
}

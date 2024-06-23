import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { EntregadorDto } from './entregador.dto';

@Controller('entregadores')
export class EntregadorController {
  constructor(private entregadorService: EntregadorService) {}

  @Get()
  findAll() {
    return this.entregadorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.entregadorService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregadorService.remove(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) dto: EntregadorDto) {
    return this.entregadorService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: EntregadorDto,
  ) {
    return this.entregadorService.update({ id, ...dto });
  }
}

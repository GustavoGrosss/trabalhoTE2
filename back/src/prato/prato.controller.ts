import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe
} from "@nestjs/common";
import { PratoService } from './prato.service';
import { PratoDto } from './prato.dto';

@Controller('pratos')
export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

  @Get()
  findAll() {
    return this.pratoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pratoService.findById(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) pratoDto: PratoDto) {
    return this.pratoService.create(pratoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) pratoDto: PratoDto) {
    return this.pratoService.update(id, pratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pratoService.remove(id);
  }
}

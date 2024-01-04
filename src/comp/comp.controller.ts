import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompService } from './comp.service';
import { CreateCompDto } from './dto/create-comp.dto';
import { UpdateCompDto } from './dto/update-comp.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('组件')
@Controller('comp')
export class CompController {
  constructor(private readonly compService: CompService) {}

  @ApiOperation({
    summary: '新建组件',
  })
  @Post()
  create(@Body() createCompDto: CreateCompDto) {
    return this.compService.create(createCompDto);
  }

  @Get()
  findAll() {
    return this.compService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompDto: UpdateCompDto) {
    return this.compService.update(+id, updateCompDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compService.remove(+id);
  }
}

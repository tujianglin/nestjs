import { Injectable } from '@nestjs/common';
import { CreateCompDto } from './dto/create-comp.dto';
import { UpdateCompDto } from './dto/update-comp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comp } from './entities/comp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompService {
  constructor(
    @InjectRepository(Comp) private compRepository: Repository<Comp>,
  ) {}
  async create(createCompDto: CreateCompDto) {
    const a = await this.compRepository.create(createCompDto);
    return this.compRepository.save(a);
  }

  findAll() {
    return this.compRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comp`;
  }

  update(id: number, updateCompDto: UpdateCompDto) {
    return `This action updates a #${id} comp`;
  }

  remove(id: number) {
    return `This action removes a #${id} comp`;
  }
}

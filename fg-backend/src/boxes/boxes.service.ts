import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Box } from './entities/box.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Box)
    private readonly boxesRepository: Repository<Box>,
  ) {}

  findAll() {
    return this.boxesRepository.find();
  }

  async findOne(id: string) {
    const box = await this.boxesRepository.findOne({ where: { id: id } });
    if (!box) {
      throw new NotFoundException('Box not found');
    }
    return box;
  }

  create(createBoxDto: CreateBoxDto) {
    const box = this.boxesRepository.create(createBoxDto);
    return this.boxesRepository.save(box);
  }

  async update(id: string, updateBoxDto: UpdateBoxDto) {
    const box = await this.findOne(id);
    return this.boxesRepository.save({ ...box, ...updateBoxDto })
  }

  async remove(id: string) {
    const box = await this.findOne(id);
    return this.boxesRepository.remove(box)
  }
}

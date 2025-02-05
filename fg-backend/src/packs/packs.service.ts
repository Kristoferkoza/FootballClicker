import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './entities/pack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacksService {
  constructor(
    @InjectRepository(Pack)
    private readonly packsRepository: Repository<Pack>,
  ) {}

  findAll() {
    return this.packsRepository.find();
  }

  async findOne(id: string) {
    const pack = await this.packsRepository.findOne({ where: { id: id } });
    if (!pack) {
      throw new NotFoundException('Pack not found');
    }
    return pack;
  }

  create(createPackDto: CreatePackDto) {
    const pack = this.packsRepository.create(createPackDto);
    return this.packsRepository.save(pack);
  }

  async update(id: string, updatePackDto: UpdatePackDto) {
    const pack = await this.findOne(id);
    return this.packsRepository.save({ ...pack, ...updatePackDto });
  }

  async remove(id: string) {
    const pack = await this.findOne(id);
    return this.packsRepository.remove(pack);
  }
}

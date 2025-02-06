import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKitElementDto } from './dto/create-kitelement.dto';
import { UpdateKitElementDto } from './dto/update-kitelement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KitElement } from './entities/kitelement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KitElementsService {
  constructor (
    @InjectRepository(KitElement)
    private readonly kitElementsRepository: Repository<KitElement>
  ) {}

  findAll() {
    return this.kitElementsRepository.find();
  }

  async findOne(id: string) {
    const kitElement = await this.kitElementsRepository.findOne({ where: { id: id } });
    if (!kitElement)
    {
      throw new NotFoundException('Card not found');
    }
    return kitElement;
  }

  create(createKitElementDto: CreateKitElementDto) {
    const kitElement = this.kitElementsRepository.create(createKitElementDto);
    return this.kitElementsRepository.save(kitElement);
  }

  async update(id: string, updateKitElementDto: UpdateKitElementDto) {
    const kitElement = await this.findOne(id)
    return this.kitElementsRepository.save({ ...kitElement, ...updateKitElementDto })
  }

  async remove(id: string) {
    const kitElement = await this.findOne(id);
    return this.kitElementsRepository.remove(kitElement);
  }
}

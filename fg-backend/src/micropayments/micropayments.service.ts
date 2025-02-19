import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMicropaymentDto } from './dto/create-micropayment.dto';
import { UpdateMicropaymentDto } from './dto/update-micropayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Micropayment } from './entities/micropayment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MicropaymentsService {
  constructor(
    @InjectRepository(Micropayment)
    private readonly micropaymentsRepository: Repository<Micropayment>,
  ) {}

  findAll() {
    return this.micropaymentsRepository.find();
  }

  async findOne(id: string) {
    const micropayment = await this.micropaymentsRepository.findOne({
      where: { id: id },
    });
    if (!micropayment) {
      throw new NotFoundException('Micropayment not found');
    }
    return micropayment;
  }

  create(createMicropaymentDto: CreateMicropaymentDto) {
    const micropayment = this.micropaymentsRepository.create(createMicropaymentDto);
    return this.micropaymentsRepository.save(micropayment);
  }

  async update(id: string, updateMicropaymentDto: UpdateMicropaymentDto) {
    const micropayment = await this.findOne(id);
    return this.micropaymentsRepository.save({ ...micropayment, ...updateMicropaymentDto });
  }

  async remove(id: string) {
    const micropayment = await this.findOne(id);
    return this.micropaymentsRepository.remove(micropayment);
  }
}

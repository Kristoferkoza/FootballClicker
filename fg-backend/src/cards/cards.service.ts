import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}

  findAll(page: number = 1, limit: number = 100) {
    return this.cardsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string) {
    const card = await this.cardsRepository.findOne({ where: { id: id } });
    if (!card) 
    {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

  create(createCardDto: CreateCardDto) {
    const card = this.cardsRepository.create(createCardDto);
    return this.cardsRepository.save(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.findOne(id);
    return this.cardsRepository.save({ ...card, ...updateCardDto });
  }

  async remove(id: string) {
    const card = await this.findOne(id);
    return this.cardsRepository.remove(card);
  }
}

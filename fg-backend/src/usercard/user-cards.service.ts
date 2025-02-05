import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCard } from './entities/user-cards.entity';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class UserCardsService {
  constructor(
    @InjectRepository(UserCard)
    private readonly userCardRepository: Repository<UserCard>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async addCardToUser(userId: string, cardId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!user || !card) {
      throw new Error('Nie znaleziono użytkownika lub karty');
    }


    let userCard = await this.userCardRepository.findOne({
      where: { user: { id: userId }, card: { id: cardId } },
    });

    if (userCard) {
      userCard.quantity += 1;
      await this.userCardRepository.save(userCard);
    } else {
      userCard = this.userCardRepository.create({
        user,
        card,
        quantity: 1,
        firstFoundDate: Date.now(),
      });
      await this.userCardRepository.save(userCard);
    }

  }

  async getUserCards(userId: string): Promise<UserCard[]> {
    return this.userCardRepository.find({
      where: { user: { id: userId } },
      relations: ['card'],
    });
  }
}

import { Controller, Post, Param, Get } from '@nestjs/common';
import { UserCardsService } from './user-cards.service';
import { UserCard } from './entities/user-cards.entity';

@Controller('user-cards')
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @Post(':userId/:cardId')
  async addCard(
    @Param('userId') userId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.userCardsService.addCardToUser(userId, cardId);
  }

  @Get(':userId')
  async getCards(@Param('userId') userId: string): Promise<UserCard[]> {
    return this.userCardsService.getUserCards(userId);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCard } from './entities/user-cards.entity';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';
import { UserCardsService } from './user-cards.service';
import { UserCardsController } from './user-cards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserCard, User, Card])],
  providers: [UserCardsService],
  controllers: [UserCardsController],
  exports: [UserCardsService],
})
export class UserCardsModule {}

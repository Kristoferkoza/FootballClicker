import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../_services/cards/cards.service';
import { Card } from '../../_models/cards/card.model';
import { CommonModule } from '@angular/common';
import { UserCardsService } from '../../_services/usercard/user-cards.service';
import { UsersService } from '../../_services/users/users.service';
import { UserCards } from '../../_models/usercard/user-cards.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardType } from '../../_enums/card-type.enum';
import { ClubNamePipe } from '../../_pipes/club-name.pipe';
import { FlagiKrajow } from '../../_enums/flags.enum';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ClubNamePipe],
  providers: [CardsService, UserCardsService, UsersService],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  
  viewMode: 'grid' | 'list' = 'grid';
  selectedUserId: string = '';
  allCards: Card[] = [];
  userCards: UserCards[] = [];
  ownedCardsMap: { [cardId: string]: UserCards } = {};

  constructor(
    private cardsService: CardsService,
    private userCardsService: UserCardsService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.selectedUserId = this.usersService.getSelectedAccountId()!;

    this.cardsService.findAll().subscribe((cards: any) => {
      this.allCards = cards;

      this.userCardsService.getUserCards(this.selectedUserId)
        .subscribe((userCards: UserCards[]) => {
          this.userCards = userCards;
          this.ownedCardsMap = {};
          userCards.forEach(uc => {
            this.ownedCardsMap[uc.card.id] = uc;
          });
        });
    });
  }

  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  isOwned(card: Card): boolean {
    return !!this.ownedCardsMap[card.id];
  }

  getFirstFoundDate(card: Card): string {
    const userCard = this.ownedCardsMap[card.id];
    return userCard && userCard.firstFoundDate
      ? new Date(userCard.firstFoundDate).toLocaleDateString()
      : '';
  }

  getQuantity(card: Card): number {
    const userCard = this.ownedCardsMap[card.id];
    return userCard ? userCard.quantity : 0;
  }

  get commonCards(): Card[] {
    return this.allCards.filter(card => card.cardType === CardType.BLUE);
  }
  get rareCards(): Card[] {
    return this.allCards.filter(card => card.cardType === CardType.PINK);
  }
  get epicCards(): Card[] {
    return this.allCards.filter(card => card.cardType === CardType.PURPLE);
  }
  get legendaryCards(): Card[] {
    return this.allCards.filter(card => card.cardType === CardType.YELLOW);
  }

  getFlagCode = (nationality: string): string | undefined => {
    return FlagiKrajow[nationality as keyof typeof FlagiKrajow];
  };
}

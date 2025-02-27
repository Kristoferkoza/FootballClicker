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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, FormsModule],
  providers: [CardsService, UserCardsService, UsersService],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  selectedUserId: string = '';
  allCards: Card[] = [];
  userCards: UserCards[] = [];
  ownedCardsMap: { [cardId: string]: UserCards } = {};
  
  minOverall: number | null = null;
  maxOverall: number | null = null;
  sortBy: string = 'overallDesc';
  filteredCards: Card[] = [];
  paginatedCards: Card[] = [];

  selectedCardType: string = '';
  selectedPosition: string = '';
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 1;
  cardTypes = Object.values(CardType);
  positions: string[] = ["BR", "CPS", "PO", "ŚO", "LO", "CLS", "ŚPD", "ŚP", "LP", "PP", "ŚPO", "PS", "N", "LS"];

  constructor(
    private cardsService: CardsService,
    private userCardsService: UserCardsService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.selectedUserId = this.usersService.getSelectedAccountId()!;

    this.cardsService.findAll().subscribe((cards: any) => {
      this.allCards = cards;
      this.applyFilters();

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

  // getFlagCode = (nationality: string): string | undefined => {
  //   return FlagiKrajow[nationality as keyof typeof FlagiKrajow];
  // };

  applyFilters() {
    this.filteredCards = this.allCards.filter(card => {
      const matchesMin = this.minOverall ? card.overall >= this.minOverall : true;
      const matchesMax = this.maxOverall ? card.overall <= this.maxOverall : true;
      const matchesType = this.selectedCardType ? card.cardType === this.selectedCardType : true;
      const matchesPosition = this.selectedPosition ? card.position === this.selectedPosition : true;
      
      return matchesMin && matchesMax && matchesType && matchesPosition;
    });

    this.sortCards();
    this.updatePagination();
  }

  sortCards() {
    this.filteredCards.sort((a, b) => {
      switch(this.sortBy) {
        case 'overallDesc': return b.overall - a.overall;
        case 'overallAsc': return a.overall - b.overall;
        case 'nameAsc': return a.name.localeCompare(b.name);
        case 'nameDesc': return b.name.localeCompare(a.name);
        default: return b.overall - a.overall;
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
    this.paginatedCards = this.filteredCards.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CardsService } from '../_services/cards/cards.service';
import { Card } from '../_models/cards/card.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserCardsService } from '../_services/usercard/user-cards.service';
import { UsersService } from '../_services/users/users.service';
import { UserCards } from '../_models/usercard/user-cards.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [CardsService, UserCardsService, UsersService],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  constructor(private cardsService: CardsService, private userCardsService: UserCardsService, private usersService: UsersService) {}

  cards: Card[] = [];
  userCards: UserCards[] = []
  selectedUserId: string = '';

  ngOnInit() {
    this.selectedUserId = this.usersService.getSelectedAccountId()!;
    this.userCardsService.getUserCards(this.selectedUserId).subscribe((response: any) => {
      
      this.userCards = response as UserCards[];
      console.log(this.userCards[1]);
      for (let i = 0; i < this.userCards.length; i++) {
        this.cardsService.findOne(this.userCards[i].card.id).subscribe((card: any) => {
          this.cards.push(card);
        });
      }
    });

  }

}

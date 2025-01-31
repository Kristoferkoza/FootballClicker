import { Component, OnInit } from '@angular/core';
import { CardsService } from '../_services/cards/cards.service';
import { Card } from '../_models/cards/card.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [CardsService],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  constructor(private cardsService: CardsService) {}

  cards: Card[] = [];

  ngOnInit() {
    this.cardsService.findAll().subscribe((response: any) => {
      this.cards = response as Card[];
    });
  }

}

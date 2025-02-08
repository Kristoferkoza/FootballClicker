import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../_models/cards/card.model';
import { CardsService } from '../../_services/cards/cards.service';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-packs-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
    providers: [CardsService],
    templateUrl: './packs-dialog.component.html',
    styleUrl: './packs-dialog.component.scss',
})
export class PacksDialogComponent implements OnInit {
  cards: any[] = [];
  loading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cardsIds: string[] },
    private cardsService: CardsService,
    private dialogRef: MatDialogRef<PacksDialogComponent>
  ) {}

  ngOnInit() {
    const droppedCardsIds = this.data.cardsIds
    const observables = droppedCardsIds.map((id: string) => 
      this.cardsService.findOne(id)
    );

    forkJoin(observables).subscribe({
      next: (cards: any) => {
        this.cards = cards;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cards:', err);
        this.loading = false;
      }
    });
  }

  getRarityClass(rarity: string): string {
    return rarity.toLowerCase();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

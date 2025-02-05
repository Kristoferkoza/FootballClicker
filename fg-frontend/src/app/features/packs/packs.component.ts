import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users/users.service';
import { User } from '../../_models/users/user.model';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PacksService } from '../../_services/packs/packs.service';
import { Pack } from '../../_models/packs/pack.model';
import { CardsService } from '../../_services/cards/cards.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, map } from 'rxjs';
import { PacksDialogComponent } from '../packs-dialog/packs-dialog.component';
import { GameService } from '../../_services/game/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-packs',
    standalone: true,
    imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule],
    providers: [UsersService, PacksService, CardsService, GameService],
    templateUrl: './packs.component.html',
    styleUrl: './packs.component.scss',
})
export class PacksComponent implements OnInit {
    selectedAccount!: User;
    loading: boolean = true;

    packs: Pack[] = [];

    constructor(
        private usersService: UsersService,
        private packsService: PacksService,
        private cardsService: CardsService,
        private gameService: GameService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        const selectedAccountId = localStorage.getItem('selectedAccountId')!;
        this.usersService
            .findOne(selectedAccountId)
            .subscribe((response: any) => {
                this.selectedAccount = response as User;

                this.packsService.findAll().subscribe((packs: any) => {
                    this.packs = packs as Pack[];
                    this.loading = false;
                });
            });
    }

    getProbabilities(pack: Pack): any[] {
        return [
            { rarity: 'Common', value: pack.common_probability },
            { rarity: 'Rare', value: pack.rare_probability },
            { rarity: 'Epic', value: pack.epic_probability },
            { rarity: 'Legendary', value: pack.legendary_probability },
        ].filter((p) => p.value > 0);
    }

    buyPack(pack: Pack) {
        let userPoints = this.gameService.getCounter()!
        if (userPoints >= pack.cost) {
            this.gameService.setCounter(userPoints-pack.cost)
            const chosenCardIds = new Set<number>();
            const cardObservables = [];

            for (let i = 0; i < pack.number_of_cards; i++) {
                const random = Math.floor(Math.random() * 100) + 1;
                const cardType = this.determineCardType(random, pack);

                const cardObservable = this.cardsService
                    .findAllIdsByType(cardType)
                    .pipe(
                        map((cardsIds) => {
                            const availableCards = cardsIds.filter(
                                (id) => !chosenCardIds.has(id)
                            );

                            if (availableCards.length === 0) {
                                throw new Error(
                                    `Brak dostępnych kart dla typu ${cardType} po uwzględnieniu już wybranych.`
                                );
                            }

                            const randomIndex = Math.floor(
                                Math.random() * availableCards.length
                            );
                            const selectedId = availableCards[randomIndex];

                            chosenCardIds.add(selectedId);
                            return selectedId;
                        })
                    );

                cardObservables.push(cardObservable);
            }

            forkJoin(cardObservables).subscribe({
                next: (droppedCardsIds) => {
                    this.dialog.open(PacksDialogComponent, {
                        data: { cardsIds: droppedCardsIds },
                        width: '90%',
                        maxWidth: '800px',
                        panelClass: 'cards-modal',
                    });
                },
                error: (err) => console.error('Error buying pack:', err),
            });
        } else {
            this.snackBar.open(`Brakuje ${pack.cost-userPoints} punktów, żeby kupić paczkę.`, 'Zamknij', {
                duration: 5000,
            });
        }
    }

    private determineCardType(random: number, pack: Pack): string {
        let threshold = 0;
        threshold += pack.common_probability;
        if (random <= threshold) return 'common';
        threshold += pack.rare_probability;
        if (random <= threshold) return 'rare';
        threshold += pack.epic_probability;
        if (random <= threshold) return 'epic';
        return 'legendary';
    }
}

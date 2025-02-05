import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users/users.service';
import { User } from '../../_models/users/user.model';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PacksService } from '../../_services/packs/packs.service';
import { Pack } from '../../_models/packs/pack.model';
import { CardsService } from '../../_services/cards/cards.service';

@Component({
    selector: 'app-packs',
    standalone: true,
    imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule],
    providers: [UsersService, PacksService, CardsService],
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
        let droppedCardsIds: any[] = []
        for (let i = 0; i < pack.number_of_cards; i++) {
            const random = Math.floor(Math.random() * 100) + 1;
            let threshold = 0;
            let cardType: string;

            if (random <= (threshold += pack.common_probability)) {
                cardType = 'common';
            } else if (random <= (threshold += pack.rare_probability)) {
                cardType = 'rare';
            } else if (random <= (threshold += pack.epic_probability)) {
                cardType = 'epic';
            } else {
                cardType = 'legendary';
            }

            let cardsOfTypeIds = []
            this.cardsService.findAllIdsByType(cardType).subscribe(cardsIds => {
                cardsOfTypeIds = cardsIds
                let randomCardId = cardsIds[Math.floor(Math.random() * cardsIds.length)];
                while (droppedCardsIds.includes(randomCardId)) {
                    randomCardId = cardsIds[Math.floor(Math.random() * cardsIds.length)];
                }
                droppedCardsIds.push(randomCardId)
              });
              
            console.log(`Wylosowana liczba: ${random} => ${cardType}`);
        }
        console.log('Id kart wylosowanych:', droppedCardsIds);
    }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../../_services/users/users.service';
import { Box } from '../../_models/boxes/box.model';
import { User } from '../../_models/users/user.model';
import { BoxesService } from '../../_services/boxes/boxes.service';
import { GameService } from '../../_services/game/game.service';
import { KitElementsService } from '../../_services/kitelements/kit-elements.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserKitElementsService } from '../../_services/userkitelement/user-kitelements.service';
import { map } from 'rxjs';
import { BoxesDialogComponent } from '../boxes-dialog/boxes-dialog.component';

@Component({
    selector: 'app-boxes',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './boxes.component.html',
    styleUrl: './boxes.component.scss',
})
export class BoxesComponent {
    selectedAccount!: User;
    loading: boolean = true;

    boxes: Box[] = [];

    constructor(
        private usersService: UsersService,
        private boxesService: BoxesService,
        private gameService: GameService,
        private kitElementsService: KitElementsService,
        private userKitElementsService: UserKitElementsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        const selectedAccountId = localStorage.getItem('selectedAccountId')!;
        this.usersService
            .findOne(selectedAccountId)
            .subscribe((response: any) => {
                this.selectedAccount = response as User;

                this.boxesService.findAll().subscribe((boxes: any) => {
                    this.boxes = boxes as Box[];
                    this.loading = false;
                });
            });
    }

    getProbabilities(box: Box): any[] {
        return [
            { rarity: 'Common', value: box.common_probability },
            { rarity: 'Rare', value: box.rare_probability },
            { rarity: 'Epic', value: box.epic_probability },
            { rarity: 'Legendary', value: box.legendary_probability },
        ].filter((p) => p.value > 0);
    }

    buyBox(box: Box) {
        let userPoints = this.gameService.getCounter()!;
        if (userPoints >= box.cost) {
            this.gameService.setCounter(userPoints - box.cost);

            const random = Math.floor(Math.random() * 100) + 1;
            const kitElementType = this.determineKitElementType(random, box);

            this.kitElementsService
                .findAllIdsByType(kitElementType)
                .pipe(
                    map((kitElementIds) => {
                        if (kitElementIds.length === 0) {
                            throw new Error(
                                `Brak dostępnych elementów dla typu ${kitElementType}.`
                            );
                        }

                        const randomIndex = Math.floor(
                            Math.random() * kitElementIds.length
                        );
                        return kitElementIds[randomIndex];
                    })
                )
                .subscribe({
                    next: (selectedKitElementId) => {
                        this.userKitElementsService
                            .addKitElement(
                                this.usersService.getSelectedAccountId()!,
                                selectedKitElementId
                            )
                            .subscribe({
                                next: () => {
                                    this.dialog.open(BoxesDialogComponent, {
                                        data: {
                                            kitElementId: selectedKitElementId,
                                        },
                                        width: '90%',
                                        maxWidth: '800px',
                                        panelClass: 'kit-modal',
                                    });
                                },
                                error: (error) =>
                                    console.error(
                                        'Błąd przy dodawaniu stroju:',
                                        error
                                    ),
                            });
                    },
                    error: (err) => console.error('Error buying box:', err),
                });
        } else {
            this.snackBar.open(
                `Brakuje ${
                    box.cost - userPoints
                } punktów, żeby kupić skrzynkę.`,
                'Zamknij',
                {
                    duration: 5000,
                }
            );
        }
    }

    private determineKitElementType(random: number, box: Box): string {
        let threshold = 0;
        threshold += box.common_probability;
        if (random <= threshold) return 'common';
        threshold += box.rare_probability;
        if (random <= threshold) return 'rare';
        threshold += box.epic_probability;
        if (random <= threshold) return 'epic';
        return 'legendary';
    }
}

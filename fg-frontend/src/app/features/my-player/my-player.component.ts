import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KitElement } from '../../_models/kitelements/kit-element.model';
import { KitElementsService } from '../../_services/kitelements/kit-elements.service';
import { KitPart } from '../../_enums/kit-part.enum';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserKitElementsService } from '../../_services/userkitelement/user-kitelements.service';
import { UsersService } from '../../_services/users/users.service';
import { MatButtonModule } from '@angular/material/button';
import { UserKitElementConfigService } from '../../_services/userkitelementconfig/user-kitelementconfig.service';
import { UserKitElementConfig } from '../../_models/userkitelementconfig/user-kitelementconfig.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BonusTimerService } from '../../_services/bonus-timer.service';
import { KitType } from '../../_enums/kit-type.enum';

@Component({
    selector: 'app-my-player',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
    providers: [
        KitElementsService,
        UserKitElementsService,
        UsersService,
        UserKitElementConfigService,
    ],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate(
                    '0.3s ease',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
        ]),
    ],
    templateUrl: './my-player.component.html',
    styleUrl: './my-player.component.scss',
})
export class MyPlayerComponent implements OnInit {
    loading: boolean = true;
    kitElements!: KitElement[];

    boots!: KitElement[];
    selectedBoot: KitElement | null = null;
    socks!: KitElement[];
    selectedSock: KitElement | null = null;
    shorts!: KitElement[];
    selectedShort: KitElement | null = null;
    tshirts!: KitElement[];
    selectedTshirt: KitElement | null = null;

    constructor(
        private kitElementsService: KitElementsService,
        private userKitElementsService: UserKitElementsService,
        private userKitElementConfigService: UserKitElementConfigService,
        private usersService: UsersService,
        private snackBar: MatSnackBar,
        private bonusTimerService: BonusTimerService,
    ) {}

    ngOnInit(): void {
        this.loading = true;
        const userId = this.usersService.getSelectedAccountId()!;
        
        this.userKitElementConfigService
            .getUserKitConfig(userId)
            .subscribe((config: any) => {                
                this.userKitElementsService.getUserKitElements(userId).subscribe(
                    (data: any[]) => {
                        this.boots = this.filterKitElements(data, KitPart.BOOTS);
                        this.socks = this.filterKitElements(data, KitPart.SOCKS);
                        this.shorts = this.filterKitElements(data, KitPart.SHORTS);
                        this.tshirts = this.filterKitElements(data, KitPart.TSHIRT);

                        this.selectedBoot = this.findElementById(this.boots, config.bootId);
                        this.selectedSock = this.findElementById(this.socks, config.sockId);
                        this.selectedShort = this.findElementById(this.shorts, config.shortId);
                        this.selectedTshirt = this.findElementById(this.tshirts, config.tshirtId);

                        this.loading = false;
                    },
                    (error) => {
                        this.snackBar.open(`Wystąpił błąd podczas pobierania danych`, 'Zamknij', {
                            duration: 5000,
                        });
                        this.loading = false;
                    }
                );
            });
    }

    private filterKitElements(data: any[], part: KitPart): KitElement[] {
        return data
            .filter(item => item.kitElement && item.kitElement.kit_part === part)
            .map(item => item.kitElement);
    }

    private findElementById(elements: KitElement[], id: string | null): KitElement | null {
        return id ? elements.find(element => element.id === id) || null : null;
    }

    getClubFromName(name: string) {
        return name.replace(/^(Korki|Getry|Spodenki|Koszulka)\s+/, '');
    }

    getRarityName(kitType: KitType): string {
        switch(kitType) {
            case KitType.COMMON: return 'Powszechny';
            case KitType.RARE: return 'Rzadki';
            case KitType.EPIC: return 'Epicki';
            case KitType.LEGENDARY: return 'Legendarny';
            default: return 'Nieznany';
        }
    }
    
    getRarityClass(kitType: KitType): string {
        switch(kitType) {
            case KitType.COMMON: return 'common';
            case KitType.RARE: return 'rare';
            case KitType.EPIC: return 'epic';
            case KitType.LEGENDARY: return 'legendary';
            default: return '';
        }
    }

    countBonus() {
        const selectedElements: KitElement[] = [
            this.selectedBoot,
            this.selectedSock,
            this.selectedShort,
            this.selectedTshirt
        ].filter((el): el is KitElement => el !== null);
    
        let total = 0;
    
        for (const element of selectedElements) {
            const club = this.getClubFromName(element.name);
            const count = selectedElements.filter(el => this.getClubFromName(el.name) === club).length;
    
            let multiplier = 1;
            if (count >= 4) {
                multiplier = 2.5;
            } else if (count >= 3) {
                multiplier = 2;
            } else if (count >= 2) {
                multiplier = 1.5;
            }
            total += Math.round(element.points_given * multiplier);
        }
    
        return total;
    }

    savePlayer() {        
        let bonus = this.countBonus()
        const userId = this.usersService.getSelectedAccountId()!;
        const updatedConfig: Partial<UserKitElementConfig> = {
            userId,
            bootId: this.selectedBoot?.id || null,
            sockId: this.selectedSock?.id || null,
            shortId: this.selectedShort?.id || null,
            tshirtId: this.selectedTshirt?.id || null,
            bonus: bonus,
        };

        this.userKitElementConfigService.updateUserKitConfig(userId, updatedConfig).subscribe(
            (response) => {
                this.bonusTimerService.resetBonusTimer(userId)
                this.snackBar.open(`Zawodnik został zaaktualizowany. Bonusowe punkty: ${updatedConfig.bonus}.`, 'Zamknij', {
                    duration: 5000,
                });
            },
            (error) => {
                this.snackBar.open(`Wystąpił problem w trakcie zapisu`, 'Zamknij', {
                    duration: 5000,
                });
            }
        );
    }
}

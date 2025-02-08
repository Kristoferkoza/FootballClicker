import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { UserKitElementConfigService } from './userkitelementconfig/user-kitelementconfig.service';
import { GameService } from './game/game.service';

@Injectable({
  providedIn: 'root',
})
export class BonusTimerService {
  private bonusTimerSubscription!: Subscription;

  constructor(
    private configService: UserKitElementConfigService,
    private gameService: GameService
    ) {}

  startBonusTimer(userId: string): void {
    if (this.bonusTimerSubscription) {
      this.bonusTimerSubscription.unsubscribe();
    }

    this.bonusTimerSubscription = interval(30000).subscribe(() => {
      this.configService.getUserBonus(userId).subscribe(bonus => {
        let counter = this.gameService.getCounter()!
        counter += bonus;
        this.gameService.setCounter(counter)
        console.log(`Dodano bonus ${bonus}. Nowy counter: ${counter}`);
      });
    });
  }

  stopBonusTimer(): void {
    if (this.bonusTimerSubscription) {
      this.bonusTimerSubscription.unsubscribe();
    }
  }

  resetBonusTimer(userId: string): void {
    this.stopBonusTimer();
    this.startBonusTimer(userId);
  }
}

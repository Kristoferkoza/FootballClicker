import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../_models/users/user.model';
import { UsersService } from '../../_services/users/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from '../../_services/game/game.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BonusTimerService } from '../../_services/bonus-timer.service';

@Component({
    selector: 'app-clicker',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
    providers: [UsersService, BonusTimerService],
    templateUrl: './clicker.component.html',
    styleUrls: ['./clicker.component.scss'],
})
export class ClickerComponent implements OnInit, OnDestroy {
    selectedAccount!: User;
    counter = 0;

    loading = true;

    private intervalId: any;

    constructor(
        private usersService: UsersService,
        private router: Router,
        private gameService: GameService,
        private snackBar: MatSnackBar,
        private bonusTimerService: BonusTimerService,
    ) {}

    ngOnInit() {
        const selectedAccountId = localStorage.getItem('selectedAccountId')!;
        this.usersService
            .findOne(selectedAccountId)
            .subscribe((response: any) => {
                this.selectedAccount = response as User;
                const localCounter = this.gameService.getCounter();
                const dbCounter = this.selectedAccount.points;
                if (localCounter != dbCounter && localCounter != null) {
                    this.counter = localCounter;
                } else {
                    this.counter = dbCounter;
                    this.gameService.setCounter(this.counter);
                }
                this.loading = false;
            });
        this.intervalId = setInterval(() => {
            this.usersService.update(this.selectedAccount.id, {
                points: this.counter,
            });
            this.gameService.setCounter(this.counter);
            this.snackBar.open(`Auto zapis zakończony z wynikiem: ${this.counter}`, 'Zamknij', {
                duration: 5000,
            });
        }, 300000);
    }

    increment() {
        this.counter = this.gameService.getCounter()!
        this.counter++;
        this.gameService.setCounter(this.counter);
    }

    endGame() {
        this.usersService.update(this.selectedAccount.id, {
            points: this.counter,
        });
        this.usersService.removeSelectedAccountId();
        this.bonusTimerService.stopBonusTimer()
        this.router.navigate(['/select-account']);
    }

    ngOnDestroy() {
        this.counter = this.gameService.getCounter()!
        this.gameService.setCounter(this.counter);
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

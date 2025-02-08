import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/users/user.model';
import { UsersService } from '../../_services/users/users.service';
import { Router } from '@angular/router';
import { GameService } from '../../_services/game/game.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BonusTimerService } from '../../_services/bonus-timer.service';

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [UsersService],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SelectAccountComponent implements OnInit {
  accounts: User[] = [];
  loading: boolean = true;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private gameService: GameService,
    private bonusTimerService: BonusTimerService,
  ) {}

  ngOnInit() {
    this.gameService.deleteCounter();
    this.usersService.findAll().subscribe(accounts => {
      this.accounts = accounts as User[];
      this.loading = false
    });
  }

  play(userId: string) {
    this.usersService.setSelectedAccountId(userId);
    this.bonusTimerService.startBonusTimer(userId);
    this.router.navigate(['/clicker']);
  }

  navigateToAddUser () {
    this.router.navigate(['/create-account']);
  }
}
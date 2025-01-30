import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../_models/users/user.model';
import { UsersService } from '../_services/users.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatProgressSpinnerModule],
  providers: [UsersService],
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit, OnDestroy {
  selectedAccount!: User;
  counter = 0;

  loading = true;

  private intervalId: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    const selectedAccountId = localStorage.getItem('selectedAccountId')!;
    this.usersService.findOne(selectedAccountId).subscribe((response: any) => {
      const user = response as User;
      this.selectedAccount = user;
      this.counter = this.selectedAccount.points;
      this.loading = false;
    });
    this.intervalId = setInterval(() => {
      console.log(`Liczba kliknięć: ${this.counter}`);
    }, 300000);
  }

  increment() {
    this.counter++;
  }

  endGame() {
    this.usersService.update(this.selectedAccount.id, { points: this.counter })
    this.router.navigate(['/select-account']);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
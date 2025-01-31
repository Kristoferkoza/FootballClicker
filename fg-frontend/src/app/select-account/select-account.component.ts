import { Component, OnInit } from '@angular/core';
import { User } from '../_models/users/user.model';
import { UsersService } from '../_services/users/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { GameService } from '../_services/game/game.service';

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, HttpClientModule],
  providers: [UsersService],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  accounts: User[] = [];
  selectedAccount: User | null = null;

  constructor(private usersService: UsersService, private router: Router, private gameService: GameService) {}

  ngOnInit() {
    this.gameService.deleteCounter();
    this.usersService.findAll().subscribe((accounts => {
      this.accounts = accounts as User[];
    }));
  }

  play() {
    if (this.selectedAccount) {
      this.usersService.setSelectedAccountId(this.selectedAccount.id);
      this.router.navigate(['/clicker']);
    }
  }
}

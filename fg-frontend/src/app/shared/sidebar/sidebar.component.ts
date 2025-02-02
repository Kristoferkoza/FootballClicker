import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users/users.service';
import { User } from '../../_models/users/user.model';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatDividerModule, HttpClientModule, MatProgressSpinnerModule],
  providers: [UsersService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  sidebarOpened = true;
  selectedUser!: User;

  loading: boolean = true;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
      this.usersService.findOne(this.usersService.getSelectedAccountId()!).subscribe(user => {
        this.selectedUser = user as User;
        this.loading = false;
      });
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  
}

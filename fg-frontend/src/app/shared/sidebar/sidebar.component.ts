import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarOpened = true;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

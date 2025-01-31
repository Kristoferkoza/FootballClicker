import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fg-frontend';

  showMenu = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRouteUrl = this.router.url;
      const urlWithoutMenu = ['/select-account'];
      this.showMenu = true;
      urlWithoutMenu.forEach(url => {
        if (currentRouteUrl.includes(url)) {
          this.showMenu = false;
        }
      });
      
    });
  }
}

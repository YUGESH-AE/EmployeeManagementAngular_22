import { Component, inject, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  isSidebarCollapsed = signal(false);
  theme = inject(ThemeService);

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(value => !value);
  }
}

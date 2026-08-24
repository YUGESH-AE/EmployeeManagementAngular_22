import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly isDarkTheme = signal(this.getSavedTheme() === 'dark');

  constructor() {
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme.update(isDark => !isDark);
    this.applyTheme();
  }

  private getSavedTheme(): 'light' | 'dark' {
    return this.document.defaultView?.localStorage.getItem('employee-app-theme') === 'dark'
      ? 'dark'
      : 'light';
  }

  private applyTheme(): void {
    const theme = this.isDarkTheme() ? 'dark' : 'light';
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.documentElement.setAttribute('data-bs-theme', theme);
    this.document.defaultView?.localStorage.setItem('employee-app-theme', theme);
  }
}

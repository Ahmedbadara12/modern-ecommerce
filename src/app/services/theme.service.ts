import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  
  isDarkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        this.document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        this.document.documentElement.removeAttribute('data-theme');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}

import { Injectable, signal, effect, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private toastService = inject(ToastService);
  
  isAuthenticated = signal<boolean>(this.checkAuth());
  user = signal<{ name: string; email: string } | null>(this.loadUser());
  
  isLoginModalOpen = signal(false);

  constructor() {
    effect(() => {
      const auth = this.isAuthenticated();
      if (auth && this.user()) {
        localStorage.setItem('nexus_token', 'mock_jwt_token_12345');
        localStorage.setItem('nexus_user', JSON.stringify(this.user()));
      } else {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
      }
    });
  }

  private checkAuth(): boolean {
    return !!localStorage.getItem('nexus_token');
  }

  private loadUser(): any {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  }

  login(email: string, pass: string) {
    if (email && pass) {
      this.user.set({ name: email.split('@')[0], email });
      this.isAuthenticated.set(true);
      this.isLoginModalOpen.set(false);
      this.toastService.show(`Welcome back, ${this.user()?.name}!`, 'success');
    }
  }

  logout() {
    this.isAuthenticated.set(false);
    this.user.set(null);
    this.toastService.show('Logged out successfully', 'info');
  }

  openLoginModal() {
    this.isLoginModalOpen.set(true);
  }
  
  closeLoginModal() {
    this.isLoginModalOpen.set(false);
  }
}

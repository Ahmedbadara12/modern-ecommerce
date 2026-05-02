import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" [class.open]="authService.isLoginModalOpen()" (click)="authService.closeLoginModal()"></div>
    
    <div class="modal-content glass-panel" [class.open]="authService.isLoginModalOpen()">
      <button class="close-btn" (click)="authService.closeLoginModal()"><i class='bx bx-x'></i></button>
      
      <div class="text-center" style="margin-bottom: 2rem;">
        <h2 style="color: var(--text-primary); margin-bottom: 0.5rem;">Welcome Back</h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Sign in to securely access your cart and complete checkout.</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;">Email Address</label>
          <div class="input-icon" style="position: relative;">
            <i class='bx bx-envelope' style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 1.2rem;"></i>
            <input type="email" formControlName="email" placeholder="name@example.com" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.8rem; border: 1px solid var(--border-color); border-radius: 8px; background: var(--surface-color-light); color: var(--text-primary); font-family: inherit;">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;">Password</label>
          <div class="input-icon" style="position: relative;">
            <i class='bx bx-lock-alt' style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); font-size: 1.2rem;"></i>
            <input type="password" formControlName="password" placeholder="••••••••" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.8rem; border: 1px solid var(--border-color); border-radius: 8px; background: var(--surface-color-light); color: var(--text-primary); font-family: inherit;">
          </div>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 1rem;" [disabled]="loginForm.invalid">
          Sign In
        </button>
      </form>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
      z-index: 10000; opacity: 0; visibility: hidden; transition: all 0.3s;
      &.open { opacity: 1; visibility: visible; }
    }

    .modal-content {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -45%) scale(0.95);
      width: 100%; max-width: 450px; z-index: 10001; padding: 2.5rem;
      opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border-radius: 16px;
      
      &.open { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
    }

    .close-btn {
      position: absolute; top: 1rem; right: 1rem;
      background: none; border: none; font-size: 1.5rem; color: var(--text-secondary);
      cursor: pointer; transition: color 0.2s;
      &:hover { color: var(--text-primary); }
    }

    [dir="rtl"] {
      .input-icon i { left: auto; right: 1rem; }
      .input-icon input { padding-left: 1rem !important; padding-right: 2.8rem !important; }
      .close-btn { right: auto; left: 1rem; }
    }
  `]
})
export class LoginModalComponent {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['demo@nexus.com', [Validators.required, Validators.email]],
    password: ['password123', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!);
    }
  }
}

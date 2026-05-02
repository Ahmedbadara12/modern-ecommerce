import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts()" class="toast-message" [ngClass]="toast.type">
        <i class='bx' [ngClass]="{
          'bx-check-circle': toast.type === 'success',
          'bx-error-circle': toast.type === 'error',
          'bx-info-circle': toast.type === 'info'
        }"></i>
        <span>{{ toast.message }}</span>
        <button (click)="toastService.remove(toast.id)"><i class='bx bx-x'></i></button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .toast-message {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      background: var(--surface-color);
      color: var(--text-primary);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-left: 4px solid;
      animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      min-width: 300px;
      
      &.success { border-left-color: #10b981; i:first-child { color: #10b981; } }
      &.error { border-left-color: #ef4444; i:first-child { color: #ef4444; } }
      &.info { border-left-color: #3b82f6; i:first-child { color: #3b82f6; } }
      
      i:first-child { font-size: 1.5rem; }
      
      span { flex: 1; font-weight: 500; font-size: 0.95rem; }
      
      button {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        transition: color 0.2s;
        &:hover { color: var(--text-primary); }
      }
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInRtl {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    [dir="rtl"] .toast-container {
      right: auto;
      left: 2rem;
    }
    [dir="rtl"] .toast-message {
      border-left: none;
      border-right: 4px solid;
      animation-name: slideInRtl;
      &.success { border-right-color: #10b981; }
      &.error { border-right-color: #ef4444; }
      &.info { border-right-color: #3b82f6; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}

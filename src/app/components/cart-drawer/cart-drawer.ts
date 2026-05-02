import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <div class="cart-overlay" [class.open]="cartService.isDrawerOpen()" (click)="cartService.closeDrawer()"></div>
    <div class="cart-drawer glass-panel" [class.open]="cartService.isDrawerOpen()">
      <div class="drawer-header">
        <h3>{{ 'CART' | translate }}</h3>
        <button class="close-btn" (click)="cartService.closeDrawer()"><i class='bx bx-x'></i></button>
      </div>
      
      <div class="drawer-content">
        <div *ngIf="cartService.items().length === 0" class="empty-cart text-center">
          <i class='bx bx-cart' style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
          <p>Your cart is empty.</p>
        </div>
        
        <div class="cart-items" *ngIf="cartService.items().length > 0">
          <div class="cart-item" *ngFor="let item of cartService.items()">
            <img [src]="item.product.image" [alt]="item.product.name" class="item-img">
            <div class="item-details">
              <div class="item-name">{{ item.product.name }}</div>
              <div class="item-price">\${{ item.product.price }} x {{ item.quantity }}</div>
            </div>
            <button class="remove-btn" (click)="cartService.removeFromCart(item.product.id)">
              <i class='bx bx-trash'></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="drawer-footer" *ngIf="cartService.items().length > 0">
        <div class="total">
          <span>Total</span>
          <span>\${{ cartService.totalPrice() | number:'1.2-2' }}</span>
        </div>
        <button class="btn-primary" style="width: 100%; justify-content: center;" routerLink="/checkout" (click)="cartService.closeDrawer()">
          {{ 'CHECKOUT' | translate }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      &.open { opacity: 1; visibility: visible; }
    }
    
    .cart-drawer {
      position: fixed;
      top: 0;
      right: -400px;
      width: 100%;
      max-width: 400px;
      height: 100vh;
      z-index: 10001;
      display: flex;
      flex-direction: column;
      border-radius: 0;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
      
      &.open { transform: translateX(-400px); }
    }
    
    .drawer-header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      h3 { margin: 0; color: var(--text-primary); }
      .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary); transition: color 0.2s; &:hover { color: var(--text-primary); } }
    }
    
    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      .item-img { width: 60px; height: 60px; object-fit: contain; border-radius: 8px; background: white; padding: 0.2rem; }
      .item-details { flex: 1; .item-name { font-weight: 600; font-size: 0.95rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-primary); } .item-price { color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.2rem; } }
      .remove-btn { background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; &:hover { background: rgba(239, 68, 68, 0.1); } }
    }
    
    .empty-cart { padding: 4rem 0; color: var(--text-secondary); }
    
    .drawer-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
      .total { display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-primary); }
    }

    [dir="rtl"] .cart-drawer {
      right: auto; left: -400px;
      &.open { transform: translateX(400px); }
    }
  `]
})
export class CartDrawerComponent {
  cartService = inject(CartService);
}

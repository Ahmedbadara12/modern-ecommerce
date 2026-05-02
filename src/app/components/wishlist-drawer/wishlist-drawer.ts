import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-overlay" [class.open]="wishlistService.isDrawerOpen()" (click)="wishlistService.closeDrawer()"></div>
    <div class="cart-drawer glass-panel" [class.open]="wishlistService.isDrawerOpen()">
      <div class="drawer-header">
        <h3>Wishlist</h3>
        <button class="close-btn" (click)="wishlistService.closeDrawer()"><i class='bx bx-x'></i></button>
      </div>
      
      <div class="drawer-content">
        <div *ngIf="wishlistService.totalItems() === 0" class="empty-cart text-center">
          <i class='bx bx-heart' style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
          <p>Your wishlist is empty.</p>
        </div>
        
        <div class="cart-items" *ngIf="wishlistService.totalItems() > 0">
          <div class="cart-item" *ngFor="let product of wishlistService.wishlist()">
            <img [src]="product.image" [alt]="product.name" class="item-img">
            <div class="item-details">
              <div class="item-name" style="-webkit-line-clamp: 2;">{{ product.name }}</div>
              <div class="item-price">\${{ product.price }}</div>
              <button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; margin-top: 0.5rem;" (click)="addToCart(product)">Add to Cart</button>
            </div>
            <button class="remove-btn" (click)="wishlistService.toggle(product)">
              <i class='bx bx-trash'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Using the same styles as cart-drawer, so we don't duplicate. We can just copy them over here or rely on global classes if we had them. */
    .cart-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);
      z-index: 10000; opacity: 0; visibility: hidden; transition: all 0.3s;
      &.open { opacity: 1; visibility: visible; }
    }
    
    .cart-drawer {
      position: fixed; top: 0; right: -400px; width: 100%; max-width: 400px; height: 100vh;
      z-index: 10001; display: flex; flex-direction: column; border-radius: 0;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
      &.open { transform: translateX(-400px); }
    }
    
    .drawer-header {
      padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid var(--border-color);
      h3 { margin: 0; color: var(--text-primary); }
      .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary); transition: color 0.2s; &:hover { color: var(--text-primary); } }
    }
    
    .drawer-content { flex: 1; overflow-y: auto; padding: 1.5rem; }
    
    .cart-item {
      display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;
      .item-img { width: 80px; height: 80px; object-fit: contain; border-radius: 8px; background: white; padding: 0.2rem; }
      .item-details { flex: 1; .item-name { font-weight: 600; font-size: 0.95rem; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-primary); line-height: 1.3; } .item-price { color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; margin-top: 0.2rem; } }
      .remove-btn { background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; &:hover { background: rgba(239, 68, 68, 0.1); } }
    }
    
    .empty-cart { padding: 4rem 0; color: var(--text-secondary); }

    [dir="rtl"] .cart-drawer {
      right: auto; left: -400px;
      &.open { transform: translateX(400px); }
    }
  `]
})
export class WishlistDrawerComponent {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
  }
}

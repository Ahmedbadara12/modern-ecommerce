import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { ToastService } from './toast.service';

export interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private toastService = inject(ToastService);
  private cartItems = signal<CartItem[]>(this.loadCart());
  public isDrawerOpen = signal(false);

  constructor() {
    effect(() => {
      localStorage.setItem('nexus_cart', JSON.stringify(this.cartItems()));
    });
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('nexus_cart');
    return saved ? JSON.parse(saved) : [];
  }

  readonly items = this.cartItems.asReadonly();
  
  readonly totalItems = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  addToCart(product: any, quantity: number = 1) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id 
          ? { ...i, quantity: i.quantity + quantity } 
          : i
        );
      }
      return [...items, { product, quantity }];
    });
    
    this.toastService.show(`Added ${product.name} to cart!`, 'success');
    this.openDrawer();
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
  }

  openDrawer() {
    this.isDrawerOpen.set(true);
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }
}

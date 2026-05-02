import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { ToastService } from './toast.service';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private toastService = inject(ToastService);
  private items = signal<Product[]>(this.loadWishlist());
  public isDrawerOpen = signal(false);

  constructor() {
    effect(() => {
      localStorage.setItem('nexus_wishlist', JSON.stringify(this.items()));
    });
  }

  private loadWishlist(): Product[] {
    const saved = localStorage.getItem('nexus_wishlist');
    return saved ? JSON.parse(saved) : [];
  }

  readonly wishlist = this.items.asReadonly();
  
  readonly totalItems = computed(() => this.items().length);

  toggle(product: Product) {
    const exists = this.items().find(i => i.id === product.id);
    if (exists) {
      this.items.update(items => items.filter(i => i.id !== product.id));
      this.toastService.show(`Removed ${product.name} from wishlist`, 'info');
    } else {
      this.items.update(items => [...items, product]);
      this.toastService.show(`Added ${product.name} to wishlist`, 'success');
    }
  }

  isInWishlist(productId: number): boolean {
    return this.items().some(i => i.id === productId);
  }

  openDrawer() {
    this.isDrawerOpen.set(true);
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }
}

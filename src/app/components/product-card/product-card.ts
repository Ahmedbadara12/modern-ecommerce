import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCard {
  @Input() product!: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    isNew?: boolean;
  };

  private cartService = inject(CartService);
  wishlistService = inject(WishlistService);

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1);
    }
  }

  toggleWishlist() {
    this.wishlistService.toggle(this.product as any);
  }
}

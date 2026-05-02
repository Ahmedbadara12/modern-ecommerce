import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGrid implements OnInit {
  private productService = inject(ProductService);

  categories = ['All', 'Keyboards', 'Audio', 'Mice', 'Accessories'];
  activeCategory = 'All';

  products: Product[] = [];
  isLoading = true;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.isLoading = false;
      }
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductService, Product } from '../../services/product.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCard, TranslatePipe],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGrid implements OnInit {
  private productService = inject(ProductService);

  categories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
  activeCategory = signal('All');
  sortBy = signal('default');

  products = signal<Product[]>([]);
  isLoading = signal(true);

  // Computed signal that filters by both category and search query, then sorts
  filteredProducts = computed(() => {
    const query = this.productService.searchQuery();
    const category = this.activeCategory();
    const sort = this.sortBy();
    
    let filtered = this.products().filter(p => {
      const matchCategory = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });

    if (sort === 'priceLow') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHigh') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sort === 'topRated') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  });

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.isLoading.set(false);
      }
    });
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  setSort(event: any) {
    this.sortBy.set(event.target.value);
  }
}

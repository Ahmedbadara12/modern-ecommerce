import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGrid } from '../../components/product-grid/product-grid';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductGrid, TranslatePipe],
  template: `
    <div class="shop-page container animate-fade-up">
      <div class="breadcrumb" style="margin-bottom: 2rem; color: var(--text-secondary); font-size: 0.9rem;">
        <a routerLink="/" style="transition: color 0.3s; color: inherit; text-decoration: none;">{{ 'HOME' | translate }}</a> 
        <i class='bx bx-chevron-right'></i> 
        <span style="color: var(--text-primary); font-weight: 500;">{{ 'DISCOVER' | translate }}</span>
      </div>
      <app-product-grid></app-product-grid>
    </div>
  `,
  styles: [`
    .shop-page {
      padding-top: 120px;
      min-height: calc(100vh - 100px);
    }
    
    /* When inside shop-page, we might want product-grid to not have huge top padding */
    :host ::ng-deep .products-section {
      padding-top: 0 !important;
    }
  `]
})
export class Shop {}

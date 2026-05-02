import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { ProductGrid } from '../../components/product-grid/product-grid';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, ProductGrid],
  template: `
    <main>
      <app-hero></app-hero>
      <app-product-grid></app-product-grid>
    </main>
  `
})
export class Home {}

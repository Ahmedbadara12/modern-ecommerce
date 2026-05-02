import { Routes } from '@angular/router';
import { checkoutGuard } from './guards/checkout.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/home/home').then(m => m.Home), // Dummy component for demo
    canActivate: [checkoutGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

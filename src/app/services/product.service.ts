import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  isNew: boolean;
  desc: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Apex Pro Mini Wireless', category: 'Keyboards', price: 239.99, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', rating: 5, isNew: true, desc: 'World’s fastest and most advanced keyboard performs effortlessly for all undertakings.' },
    { id: 2, name: 'Nova Pro High-Fidelity', category: 'Audio', price: 349.99, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80', rating: 5, isNew: false, desc: 'Hear game audio like you never have before. Transport yourself to another world of immersive gaming.' },
    { id: 3, name: 'Aerox 5 Wireless', category: 'Mice', price: 139.99, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39d7?auto=format&fit=crop&w=800&q=80', rating: 4, isNew: true, desc: 'Ultra lightweight multi-genre gaming mouse with 9 programmable buttons.' },
    { id: 4, name: 'QcK Prism XL', category: 'Accessories', price: 59.99, image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80', rating: 5, isNew: false, desc: 'Brilliant 2-zone RGB dynamic illumination for your desktop.' }
  ];

  // Simulates an HTTP GET request using RxJS
  getProducts(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS).pipe(
      delay(800) // Simulate network latency
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.MOCK_PRODUCTS.find(p => p.id === id);
    return of(product).pipe(
      delay(500)
    );
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  searchQuery = signal<string>('');

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.map(this.mapToProduct))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.mapToProduct(item))
    );
  }

  private mapToProduct(item: any): Product {
    return {
      id: item.id,
      name: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
      // Round to closest integer for our star pipe
      rating: Math.round(item.rating?.rate || 4),
      // Mark as new if high review count
      isNew: item.rating?.count > 250,
      desc: item.description
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApi = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.productApi).pipe(
      map((response) => response.products || []), 
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of([]); 
      })
    );
  }

  getProductsById(id:number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.productApi}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching product with ID ${id}:`, error);
        return of(undefined); 
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private productRemovedSubject = new Subject<Product>(); 

  cart$ = this.cartSubject.asObservable();
  productRemoved$ = this.productRemovedSubject.asObservable(); 

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]);
    this.productRemovedSubject.next(product); 
  }
}

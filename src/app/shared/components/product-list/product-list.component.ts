import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CartService } from '../../../core/services/cart/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FilterPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
 @Input({required: true}) selectedCategory!: string;
 @Input({required: true}) searchText: string = "";
 @Input({required: true}) products!: Product[]; 

 constructor(private cartService: CartService) {
  console.log(this.selectedCategory);
 }

 addToCart(product: Product) {
  this.cartService.addToCart(product);
  console.log(`${product.title} added to cart`);
}
}

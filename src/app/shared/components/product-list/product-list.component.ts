import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';

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

 constructor() {
  console.log(this.selectedCategory);
 }

 addToCart(product: any) {

 }
}

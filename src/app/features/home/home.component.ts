import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart/cart-service.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ProductListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products = signal<Product[]>([]); 
  selectedCategory = signal<string>('All');
  searchTerm = signal<string>('');

  product_Service = inject(ProductService);

  constructor(private cartService: CartService) {
    this.getProducts(); 
    this.cartService.productRemoved$.subscribe((product) => {
    this.products.update(products => products.filter((p) => p.id !== product.id));
    });
  }

  getProducts() {
    this.product_Service.getProducts().pipe(
      delay(500) 
    ).subscribe({
      next: (data) => {
        this.products.set(data);
        console.log(this.products());
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
  
  

  updateCategoryChange(category: string) {
    console.log(category);
    this.selectedCategory.set(category);
  }

  updateSearchChange(term: string) {
    this.searchTerm.set(term);
  }
}

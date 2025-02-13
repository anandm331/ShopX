import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products = signal<Product[]>([]); 
  selectedCategory = signal<string>('All');
  searchTerm = signal<string>('');

  product_Service = inject(ProductService);

  constructor() {
    this.getProducts(); 
  }

  getProducts() {
    this.product_Service.getProducts().subscribe({
      next: (data) => {
        this.products.set(data); // Set only 'products' from the response
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

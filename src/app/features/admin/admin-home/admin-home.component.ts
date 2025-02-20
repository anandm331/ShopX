import { Component, signal } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../../shared/components/product-list/product-list.component';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-admin-home',
  imports: [SidebarComponent, RouterModule, ProductListComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  selectedCategory = signal<string>('All');
  searchTerm = signal<string>('');
  products= signal<Product[]>([]);

  updateCategoryChange(category: string) {
    console.log(category);
    this.selectedCategory.set(category);
  }

  updateSearchChange(term: string) {
    this.searchTerm.set(term);
  }
}

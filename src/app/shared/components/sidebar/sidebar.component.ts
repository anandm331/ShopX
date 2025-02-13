import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() categoryChanged = new EventEmitter<string>();

  searchQuery: string = '';
  categories: string[] = ['All', 'Fragrances', 'Furniture', 'Beauty', 'Groceries'];

  onSearch() {
    this.searchQueryChanged.emit(this.searchQuery);
  }

  selectCategory(category: string) {
    this.categoryChanged.emit(category);
  }
}

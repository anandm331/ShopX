import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(products: any[], searchQuery: string, category: string): any[] {
    if (!products) return [];
    let filteredProducts = products;

    const trimSearchQuery = searchQuery.trim();

    if (category && category !== 'All') {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category.toLowerCase()
      );
    }

    if (trimSearchQuery) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(trimSearchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(products: any[], searchQuery: string, category: string): any[] {
    if (!products) return [];
    let filteredProducts = products;

    if (category && category !== 'All') {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category.toLowerCase()
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      try {
        this.product = await firstValueFrom(this.productService.getProductsById(productId));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }
}

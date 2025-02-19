import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

   ngOnInit()  {
    this.loadProduct();
   }
   
   loadProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }

    this.productService.getProductsById(productId).subscribe({
      next: (data) => {
      this.product = data
      console.log("products details",this.product);
      },
      error: (err) => console.error('Error fetching product:', err)
    });
  }
  }

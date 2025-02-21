import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CartService } from '../../../core/services/cart/cart-service.service';
import { DetailsHostDirective } from '../../directives/host-directive.directive';
import { ViewProductComponent } from '../../../features/view-product/view-product.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FilterPipe, DetailsHostDirective, RouterModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] 
})
export class ProductListComponent implements OnInit {
  @Input({ required: true }) selectedCategory!: string;
  @Input({ required: true }) searchText: string = "";
  @Input({ required: true }) products!: Product[];
  @Input({ required: true }) show!: boolean;
  @ViewChild(DetailsHostDirective, { static: true }) detailsHost!: DetailsHostDirective;
  @ViewChild('product') productRef!: ElementRef;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    console.log(this.selectedCategory); 
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(`${product.title} added to cart`);
  }

  viewProductDetails(product: Product) {
    // this.router.navigate(['/product', productId]);
    this.productRef.nativeElement.remove();
    const viewContainerRef = this.detailsHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(ViewProductComponent);
    componentRef.instance.product = product;
  }

  navigateToAdd() {
    this.router.navigate(['/admin/add-products']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { MouseDirectiveDirective } from '../../shared/directives/mouse-directive.directive';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule, HighlightDirective, MouseDirectiveDirective],
  standalone: true,
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  @Input() product: any;
  @ViewChild('details') detailsRef!: ElementRef;

  constructor() {}

  ngOnInit() {
    console.log("Product received in ngOnInit:", this.product); 
  }

  close() {
   this.detailsRef.nativeElement.remove();
  }
}

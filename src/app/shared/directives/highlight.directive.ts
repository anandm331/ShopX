import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'blue';
    this.el.nativeElement.style.color ='violet';
  }
}
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDetailsHost]',
  standalone: true,
})
export class DetailsHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

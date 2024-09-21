import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusProduct]',
  standalone: true,
})
export class StatusProductDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.el.nativeElement;
      if (element.innerText === 'In stock') {
        element.style.color = 'green';
      } else {
        element.style.color = 'red';
      }
    });
  }
}

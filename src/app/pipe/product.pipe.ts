import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product',
  standalone: true,
})
export class ProductPipe implements PipeTransform {
  transform(value: number) {
    return value === 1 ? 'In stock' : 'Out of stock';
  }
}

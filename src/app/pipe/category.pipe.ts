import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true,
})
export class CategoryPipe implements PipeTransform {
  transform(value: number) {
    return value === 0 ? 'In stock' : 'Out of stock';
  }
}

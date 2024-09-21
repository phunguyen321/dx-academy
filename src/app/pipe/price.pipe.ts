import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number, currencySymbol: string) {
    const price = value.toLocaleString('vi-VN');
    return `${price} ${currencySymbol}`;
  }
}

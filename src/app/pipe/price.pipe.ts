import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(value: string, currencySymbol: string) {
    console.log(currencySymbol)
    const price = Number(value).toLocaleString('vi-VN');
    return `${price} ${currencySymbol}`;
  }

}

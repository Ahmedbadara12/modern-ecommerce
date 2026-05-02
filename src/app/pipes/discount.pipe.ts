import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage: number = 10): number {
    if (!price) return 0;
    const discountAmount = price * (discountPercentage / 100);
    return price - discountAmount;
  }
}

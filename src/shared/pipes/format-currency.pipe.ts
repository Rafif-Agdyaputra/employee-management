import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = 'Rp.'): string {
    if (value == null) {
      return '';
    }
    const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    return `${currencySymbol} ${formattedValue}`;
  }
}

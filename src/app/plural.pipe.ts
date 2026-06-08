import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): number | string {

    const remainder100: number = value % 100;
    const remainder10: number = value % 10;

     if (value === 0) {
      return 'Нет пользователей';
    } else if (remainder100 >= 11 && remainder100 <= 14) {
      return thirdForm;
    } else if (remainder10 === 1) {
      return firstForm;
    } else if (remainder10 >= 2 && remainder10 <= 4) {
      return secondForm;
    } 

    return thirdForm;
  }

}
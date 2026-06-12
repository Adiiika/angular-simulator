import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): number | string {

    const remainder100: number = value % 100;
    const remainder10: number = value % 10;

    const isZero: boolean = value === 0;
    const isOne: boolean = remainder10 === 1;
    const isFew: boolean = remainder10 >= 2 && remainder10 <= 4;
    const isMany: boolean = remainder100 >= 11 && remainder100 <= 14;

    if (isZero) {
      return 'Данные отсутствуют';
    } else if (isMany) {
      return thirdForm;
    } else if (isOne) {
      return firstForm;
    } else if (isFew) {
      return secondForm;
    }

    return thirdForm;
  }

}
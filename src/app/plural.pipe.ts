import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): number | string {

    const remainder100: number = value % 100;
    const remainder10: number = value % 10;
    const numbers: { [key: string]: number} = {
      zero: 0,
      one: 1,
      two: 2,
      four: 4,
      eleven: 11,
      fourteen: 14,
    } as const


     if (value === numbers['zero']) {
      return 'Нет пользователей';
    } else if (remainder100 >= numbers['eleven'] && remainder100 <= numbers['fourteen']) {
      return thirdForm;
    } else if (remainder10 === numbers['one']) {
      return firstForm;
    } else if (remainder10 >= numbers['two'] && remainder10 <= numbers['four']) {
      return secondForm;
    } 

    return thirdForm;
  }

}
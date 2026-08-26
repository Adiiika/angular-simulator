import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(
    value: number,
    firstForm: string,
    secondForm: string,
    thirdForm: string,
  ): number | string {
    const remainder100: number = value % 100;
    const remainder10: number = value % 10;

    const isZero: boolean = value === 0;
    const isOne: boolean = remainder10 === 1;
    const isFew: boolean = remainder10 >= 2 && remainder10 <= 4;
    const isMany: boolean = remainder100 >= 11 && remainder100 <= 14;

    if (isZero) {
      return `${ value } ${ thirdForm }`;
    } else if (isMany) {
      return `${ value }  ${ thirdForm }`;
    } else if (isOne) {
      return `${ value } ${ firstForm }`;
    } else if (isFew) {
      return `${ value } ${ secondForm }`;
    }

    return `${ value } ${ thirdForm }`;
  }

}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(phone: string, mode: string): string {

    const cleanPhone: string = phone.replace(/[()-.]/g, '');
    const compact: string = `${'+'} + ${cleanPhone.replace(/\s/g, "")}`;

    const international: string =
      `${'+'} ${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 5)} 
      ${cleanPhone.slice(5, 8)} ${cleanPhone.slice(8, 10)} ${cleanPhone.slice(10, 12)}`;

    const national: string = `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 8)} ${cleanPhone.slice(8, 10)}`;

    const masked: string =
      `${'+'} ${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 5)} ${cleanPhone.slice(5, 8).replaceAll(/./g, '*')}
      ${cleanPhone.slice(8, 10).replaceAll(/./g, '*')} ${cleanPhone.slice(10, 12)}`;

    if (mode === 'compact') {
      return compact;
    } else if (mode === 'international') {
      return international;
    } else if (mode === 'national') {
      return national;
    } else if (mode === 'masked') {
      return masked;
    }

    return cleanPhone;
  }
  
}
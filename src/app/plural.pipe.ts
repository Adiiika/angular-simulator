import { inject, Pipe, PipeTransform } from '@angular/core';
import { UserService } from './user.service';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  userService: UserService = inject(UserService);

  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): string | number {
   
    if (!value || value === 0) {
      return 'Нет пользователей';
    }

    if (value >= 5) {
    return thirdForm;
   } else if (value > 1) {
    return secondForm;
   } else if (value = 1) {
    return firstForm;
   } 
   
   return value;
  } 
  
}
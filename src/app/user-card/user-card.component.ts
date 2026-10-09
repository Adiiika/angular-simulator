import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../pipes/phone.pipe';
import { HoverDirective } from '../directives/hover.directive';
import { GradientDirective } from '../directives/gradient.directive';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective, GradientDirective, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  translateService: TranslateService = inject(TranslateService);

  onUserDelete(): void {
    this.deleteUser.emit(this.user);
  }

}
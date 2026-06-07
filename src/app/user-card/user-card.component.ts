import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../phone.pipe';
import { HoverDirective } from '../hover.directive';
import { GradientDirective } from '../gradient.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective, GradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})

export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() onDeleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  onUserDelete(): void {
    this.onDeleteUser.emit(this.user);
  }

}
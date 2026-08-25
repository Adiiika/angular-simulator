import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);

  authform: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  onSubmit(): void {
    this.authService.login(this.authform.value)
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError(() => {
           this.messageService.showError('Не удалось войти');
           return EMPTY;
        })
      ).subscribe()
  }

}
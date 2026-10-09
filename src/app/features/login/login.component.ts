import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);
  translateService: TranslateService = inject(TranslateService);

  authform: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    this.authService
      .login(this.authform.value)
      .pipe(
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError(() => {
          this.messageService.getAuthErrorMessage('messageSection.authFailureError');
          return EMPTY;
        }),
      )
      .subscribe();
  }

}

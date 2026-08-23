import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService: AuthService = inject(AuthService);
  const accessToken: string | null = authService.getToken('access');
  const refreshToken: string | null = authService.getToken('refresh');

  function cloneWithToken(): HttpRequest<unknown> {
    const originalRequestCopy: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return originalRequestCopy;
  }

  function logoutAndRedirect(): Observable<never> {
    authService.logout();
    return EMPTY;
  }

  const finalRequest: HttpRequest<unknown> = accessToken ? cloneWithToken() : req;

  return next(finalRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (!refreshToken) {
          return logoutAndRedirect();
        }
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(cloneWithToken());
          }),
          catchError(() => logoutAndRedirect()),
        );
      } else {
        return throwError(() => error);
      }
    }),
  );
};

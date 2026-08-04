import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken();

  let clonedReq: HttpRequest<unknown> = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${ token }` }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/login') && !req.url.includes('/refresh')) {

        return authService.refreshToken().pipe(
          switchMap((newTokens: { accessToken: string; refreshToken: string; }) => {
            const retryReq: HttpRequest<unknown> = req.clone({
              setHeaders: { Authorization: `Bearer ${ newTokens.accessToken }` }
            });
            return next(retryReq);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            authService.logoutToken();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
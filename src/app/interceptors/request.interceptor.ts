import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const requestTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        console.warn(req);
        console.warn(req.method, req.url, event.status, Date.now() - requestTime);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error(`Ошибка ${ req.method } ${ error.url } ${ error.status }`, Date.now() - requestTime);
      return throwError(() => error);
    }),
  );
};
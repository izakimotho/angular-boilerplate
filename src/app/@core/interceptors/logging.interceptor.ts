import {
  HttpResponse,
  type HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn, 
  type HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, tap, throwError, type Observable } from 'rxjs';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  const started = Date.now();
  let ok: string;     
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          ok = 'succeeded';
          console.log(req.url, 'returned a response with status', event.status);
        }
      },
      error: (error) => (ok = 'failed' + error.message),
      complete: () => (ok = 'completed'),
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Logging Interceptor Functional Error:', error);
      return throwError(() => error);
    }), 
       // Log when response observable either completes or errors
       finalize(() => {
         const elapsed = Date.now() - started;
         const msg = `${req.method} "${req.urlWithParams}"
            ${ok} in ${elapsed} ms.`;
            console.error(msg+`\n  ${ok}`); 
       })
  );
 
}
 

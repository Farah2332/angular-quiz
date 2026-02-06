import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReqresKeyInterceptor implements HttpInterceptor {
  private readonly apiKey = 'reqres_edf62570014346bdbea9e8ebef829c27';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('https://reqres.in/api')) {
      req = req.clone({
        setHeaders: {
          'x-api-key': this.apiKey,
        },
      });
    }

    return next.handle(req);
  }
}

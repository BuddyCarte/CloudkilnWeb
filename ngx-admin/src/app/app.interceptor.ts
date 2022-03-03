import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import moment from 'moment';


export const HEADERS = {
  TRACEID : 'X-B3-Traceid',
  AUTHORIZATION: 'Authorization',
  ACCEPT_LANGUAGE: 'Accept-Language',
  ERP_TRANSACTION: 'erp-transaction',
};

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get user token
    const token = localStorage.getItem('access_token');

    if(!token) {
      this.logout();
    }

    // send request
    let copiedReq = null;

    // if (req.url.includes('/oauth/token')) {
    //   copiedReq = req.clone({
    //     headers: req.headers.append(HEADERS.AUTHORIZATION, `Basic ${btoa('erp:erp-secret-key')}`),
    //   });
    // } else {
      copiedReq = req.clone({
        headers: req.headers
          .append(HEADERS.AUTHORIZATION, `Bearer ${token}`)
      });
    // }
    // hide notify each time calling api
    // this.appService.hideNotify();
    return next.handle(copiedReq).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<any>) => {
        // this.appendErrorLogId(error);
        // return from(Promise.reject(error));
        return from(Promise.reject(error));
      }),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            event = event.clone({body: this.modifyBody(event.body)});
          }
          return event;
        },
        error => {
          if (error.status === 401) {
            // this.refreshToken();
            this.logout();
          }
        }
      ),
      finalize(() => {

      })
    );
  }

  private appendErrorLogId(error: HttpErrorResponse) {
    const traceId =  error.headers.get(HEADERS.TRACEID);
    if (!traceId || traceId == null || traceId === ''){
      return;
    }
    if (error.error && error.error.error && typeof error.error.error === 'string' ){
      (error as any).error.error = `${error.error.error} [Trace ID: ${traceId}]`;
      return;
    }
    if (error.error && typeof error.error === 'string' ){
      (error as any).error = `${error.error} [Trace ID: ${traceId}]`;
      return;
    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return window.atob(base64);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    // this.accountService.authLogout().toPromise().then(response => {
    //   localStorage.clearStorage();
    //   this.router.navigateByUrl('/login');
    // }, (error) => {
    //   this.router.navigateByUrl('/login');
    // });
  }

  private modifyBody(body: any) {
    /*
     * write your logic to modify the body
     * */
    return body;
  }

  private refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    // if (refreshToken) {
    //   this.appService.doRefreshToken(refreshToken).subscribe((res: any) => {
    //     if (res) {
    //       const refreshTimeNew = moment().add(res.expires_in - 60, 'seconds');
    //       localStorage.setItem(LocalStorageKey.token, res.access_token);
    //       localStorage.setItem(LocalStorageKey.refresh_token, res.refresh_token);
    //       localStorage.setItem(LocalStorageKey.refresh_time, refreshTimeNew.toISOString());
    //       localStorage.setItem(LocalStorageKey.expires_in, res.expires_in);
    //     }
    //   }, (error) => {
    //     if (error){
    //       LocalStorageTool.clearStorage({
    //         url: this.router.url
    //       });
    //       this.router.navigateByUrl('/login');
    //     }
    //   });
    // }else {
    //   LocalStorageTool.clearStorage({
    //     url: this.router.url
    //   });
    //   this.router.navigateByUrl('/login');
    // }
  }

}

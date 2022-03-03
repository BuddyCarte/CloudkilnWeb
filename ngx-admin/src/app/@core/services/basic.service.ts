import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HelperService} from './helper.service';
import {environment} from '../../../environments/environment';

export class BasicService {
  public serviceUrl: string;
  public module: string;
  public systemCode: string;
  protected requestOptions: RequestOptions;
  credentials: any = {};

  /**
   * init service from system code and module
   * param systemCode
   * param module
   */
  constructor(
    systemCode: string,
    public httpClient: HttpClient,
    public helperService: HelperService,
  ) {
    this.resetRequest();
    this.systemCode = systemCode;
    const API_URL = environment.serverUrl[this.systemCode];
    if (!API_URL) {
      console.error(`Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`);
      return;
    }
    this.serviceUrl = API_URL;
  }

  resetRequest() {
    this.requestOptions = { data: {}, params: {} };
  }

  /**
   * set SystemCode
   * param systemCode
   */
  public setSystemCode(systemCode: string) {
    this.systemCode = systemCode;
    const API_URL = environment.serverUrl[this.systemCode];
    if (!API_URL) {
      console.error(`Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`);
      return;
    }
    this.serviceUrl = API_URL;
    console.info(`Serivce created ${this.serviceUrl}`);
  }

  /**
   * request is success
   */
  public requestIsSuccess(data: any): boolean {
    let isSuccess = false;
    if (data && data.type === 'SUCCESS') {
      isSuccess = true;
    }
    return isSuccess;
  }

  /*****************************************
   */
  /**
   * handleError
   */
  public handleError(error: any) {
    const errorMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(error);
  }

  /**
   * make get request
   */
  public getRequest(url: string, options?: any): Observable<any> {
    return this.httpClient.get(url, options)
      .pipe(
        tap(res => {
          },
          error => {
            this.helperService.APP_TOAST_MESSAGE.next(error);
          },
        ),
        catchError(this.handleError),
      );
  }

  /**
   * make post request
   */
  public postRequest(url: string, data?: any, options?: any): Observable<any> {
    return this.httpClient.post(url, data, options)
      .pipe(
        tap(res => {
          },
          error => {
            this.helperService.APP_TOAST_MESSAGE.next(error);
          },
        ),
        catchError(this.handleError),
      );
  }

  /**
   * make delete request
   */
  public deleteRequest(url: string): Observable<any> {
    return this.httpClient.delete(url)
      .pipe(
        tap( // Log the result or error
          res => this.helperService.APP_TOAST_MESSAGE.next(res),
          error => {
            this.helperService.APP_TOAST_MESSAGE.next(error);
          },
        ),
        catchError(this.handleError),
      );
  }

  /**
   * make put request
   */
  public putRequest(url: string, data?: any, options?: any): Observable<any> {
    return this.httpClient.put(url, data, options)
      .pipe(
        tap( // Log the result or error
          res => {
          },
          error => {
            this.helperService.APP_TOAST_MESSAGE.next(error);
          },
        ),
        catchError(this.handleError),
      );
  }
}

export interface RequestOptions {
  data?: any;
  params?: { [param: string]: string | string[] | boolean | number };
  showLoadingImmediately?: boolean;
  hideLoading?: boolean;
  ignoreError?: boolean;
  ignoreUnknowError?: boolean;
  observe?: string;
  reportProgress?: boolean;
  responseType?: string;
}

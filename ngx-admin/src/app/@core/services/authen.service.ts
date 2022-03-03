import {BasicService} from './basic.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from './helper.service';
import {environment, HTTP_OPTIONS} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenService extends BasicService {

  constructor(
    public httpClient: HttpClient,
    public helperService: HelperService,
    private http: HttpClient) {
    super('factoryService', httpClient, helperService);
  }

  login(username?: any, password?: any) {
    return this.http.post(environment.baseApiUrl + '/v1/login?username=' + username + '&password=' + password, undefined);
  }

  authenByProvider(username?: any) {
    const body = {
      type: 1,
      username: username
    }
    return this.http.post(environment.baseApiUrl + '/v1/authen', body);
  }
}

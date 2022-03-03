import {BasicService} from '../basic.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../helper.service';
import {HTTP_OPTIONS} from '@env/environment';

@Injectable({providedIn: 'root'})
export class DashboardService extends BasicService {
  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('dashboardService', httpClient, helperService);
  }

  getData() {
    return this.postRequest(this.serviceUrl, null, HTTP_OPTIONS);
  }


}

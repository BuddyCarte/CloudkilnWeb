import {BasicService} from '../basic.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../helper.service';
import {HTTP_OPTIONS} from '@env/environment';

@Injectable({providedIn: 'root'})
export class DeviceService extends BasicService {
  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('devicesService', httpClient, helperService);
  }

  doSelect() {
    const url = this.serviceUrl + 'select';
    return this.postRequest(url, null, HTTP_OPTIONS);
  }

  getData() {
    const url = this.serviceUrl + 'data';
    return this.postRequest(url, null, HTTP_OPTIONS);
  }

  getDataSnapshot(data: any) {
    const url = this.serviceUrl + 'data-snapshot';
    return this.postRequest(url, data, HTTP_OPTIONS);
  }

  doSearchDetails(data: any) {
    const url = this.serviceUrl + 'search-details';
    return this.postRequest(url, data);
  }

}

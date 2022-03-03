import {BasicService} from '../basic.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../helper.service';
import {environment, HTTP_OPTIONS} from '@env/environment';
import {NbToastrService} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';

@Injectable({providedIn: 'root'})
export class FactoryService extends BasicService {
  constructor(
    public httpClient: HttpClient,
    public helperService: HelperService,
    private http: HttpClient,
    private toastrService: NbToastrService) {
    super('factoryService', httpClient, helperService);
  }

  doSelect() {
    const url = this.serviceUrl + 'select';
    return this.postRequest(url, null, HTTP_OPTIONS);
  }

  getChamberByName(data: any) {
    const url = this.serviceUrl + 'chamber/select';
    return this.postRequest(url, data, HTTP_OPTIONS);
  }

  getFactories(data?: any) {
    return this.getRequest(environment.baseApiUrl + '/v1/factory');
  }

  save(data: any) {
    this.resetRequest();
    return this.http.post(environment.baseApiUrl + '/v1/factory?fullname=' + data['factoryDescription'] + '&factory_name=' + data['factoryName'], null);
  }

  update(data: any) {
    this.resetRequest();
    return this.putRequest(environment.baseApiUrl + '/v1/factory/' + data['id'], data);
  }

  delete(factoryId: number) {
    return this.http.delete(environment.baseApiUrl + '/v1/factory/' + factoryId);
  }
}

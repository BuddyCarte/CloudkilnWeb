import {Injectable} from '@angular/core';
import {FactoryData} from '../data/factory';

@Injectable()
export class FactoryService extends FactoryData {
  getDataFactory(): any[] {
    return this.data;
  }

  /*
    ** status : 0: Waiting,1: Active,2: Pending, 3: Service Expired
   */
  data = [{
    id: 1,
    factoryName: 'Factory 1',
    factoryDescription: 'Nhà máy số 1',
    phone: '0123456789',
    address: 'Hà Nội',
    factoryDiagram: '1 > 2 > 3',
    userNameWS: '1',
    passwordWS: '1',
    status: 0,
    ipFactory: '192.168.0.1',
    timeZone: 'GMT +7',
  }, {
    id: 2,
    factoryName: 'Factory 2',
    factoryDescription: 'Nhà máy số 2',
    phone: '0123456789',
    address: 'Hải Phòng',
    factoryDiagram: '1 > 2 > 3',
    userNameWS: '1',
    passwordWS: '1',
    status: 1,
    ipFactory: '192.168.0.1',
    timeZone: 'GMT +7',
  }, {
    id: 3,
    factoryName: 'Factory 3',
    factoryDescription: 'Nhà máy số 3',
    phone: '0123456789',
    address: 'Bắc Ninh',
    factoryDiagram: '1 > 2 > 3',
    userNameWS: '1',
    passwordWS: '1',
    status: 2,
    ipFactory: '192.168.0.1',
    timeZone: 'GMT +7',
  }];


}

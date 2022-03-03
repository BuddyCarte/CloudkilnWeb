import {Injectable} from '@angular/core';
import {ScadaData} from '../data/scada';

@Injectable()
export class ScadaService extends ScadaData {

  dataFactory = [
    {id: 1, name: 'Factory 01'},
    {id: 2, name: 'Factory 02'},
    {id: 3, name: 'Factory 03'},
    {id: 4, name: 'Factory 04'},
  ];

  dataSnapshot = [
    {id: 1, date: '10/12/2022 07:33:25'},
    {id: 2, date: '12/12/2022 08:33:25'},
    {id: 3, date: '14/12/2022 09:33:25'},
    {id: 4, date: '16/12/2022 10:33:25'},
  ];

  dataChamber = [
    {id: 1, name: 'Chamber 01'},
    {id: 2, name: 'Chamber 02'},
    {id: 3, name: 'Chamber 03'},
    {id: 4, name: 'Chamber 04'},
  ];

  dataDevices = [
    {id: 1, name: 'Bơm biến tần', status: 1},
    {id: 2, name: 'Bơm on-off', status: 1},
    {id: 3, name: 'Cảm biến nhiệt', status: 1},
    {id: 4, name: 'Cảm biến mức bùn', status: 0},
    {id: 5, name: 'Cảm biến mức nước', status: 0},
    {id: 6, name: 'Cảm biến áp suất', status: 0},
    {id: 7, name: 'Cảm biến lưu lượng', status: 0},
    {id: 8, name: 'CPU', status: 0},
    {id: 9, name: 'Động cơ khuấy', status: 0},
    {id: 10, name: 'Thiết bị tiệt trùng', status: 0},
    {id: 11, name: 'Van điện 2 chiều', status: 0},
    {id: 12, name: 'Van điện 3 chiều', status: 0},
    {id: 13, name: 'Alarm', status: 0},
  ];

  dataChamberDetails = {
    inverter: [
      {id: 1, name: 'PM1', hz: '10hz', ampe: '10A', status: 0, id_c: 1},
      {id: 2, name: 'PM2', hz: '10hz', ampe: '20A', status: 1, id_c: 1},
      {id: 3, name: 'PM3', hz: '0hz', ampe: '30A', status: 2, id_c: 1},

      {id: 4, name: 'PM1', hz: '20hz', ampe: '20A', status: 0, id_c: 2},
      {id: 5, name: 'PM2', hz: '20hz', ampe: '20A', status: 1, id_c: 2},
      {id: 6, name: 'PM3', hz: '0hz', ampe: '20A', status: 2, id_c: 2},

      {id: 7, name: 'PM1', hz: '30hz', ampe: '30A', status: 0, id_c: 3},
      {id: 8, name: 'PM2', hz: '30hz', ampe: '30A', status: 1, id_c: 3},
      {id: 9, name: 'PM3', hz: '0hz', ampe: '30A', status: 2, id_c: 3},
    ],
    onoff: [
      {id: 1, name: 'PM01', status: 0, id_c: 1},
      {id: 2, name: 'PM02', status: 1, id_c: 1},

      {id: 3, name: 'PM01', status: 0, id_c: 2},
      {id: 4, name: 'PM02', status: 1, id_c: 2},

      {id: 5, name: 'PM01', status: 0, id_c: 3},
      {id: 6, name: 'PM02', status: 1, id_c: 3},
    ],
    sensor: [
      {id: 1, name: 'CBN 01', temperature: '25 oC', status: 0, id_c: 1},
      {id: 2, name: 'CBN 02', temperature: '25 oC', status: 1, id_c: 1},
      {id: 2, name: 'CBN 03', temperature: '25 oC', status: 2, id_c: 1},

      {id: 3, name: 'CBN 01', temperature: '25 oC', status: 0, id_c: 2},
      {id: 4, name: 'CBN 02', temperature: '25 oC', status: 1, id_c: 2},
      {id: 5, name: 'CBN 03', temperature: '25 oC', status: 2, id_c: 2},

      {id: 6, name: 'CBN 01', temperature: '25 oC', status: 0, id_c: 3},
      {id: 7, name: 'CBN 02', temperature: '25 oC', status: 1, id_c: 3},
      {id: 8, name: 'CBN 03', temperature: '25 oC', status: 2, id_c: 3},
    ],
  };


  getDataChamber(): any[] {
    return this.dataChamber;
  }

  getDataFactory(): any[] {
    return this.dataFactory;
  }

  getDataSnapshot(): any[] {
    return this.dataSnapshot;
  }

  getDataDevices(): any[] {
    return this.dataDevices;
  }

  getDataChamberDetails() {
    return this.dataChamberDetails;
  }

}

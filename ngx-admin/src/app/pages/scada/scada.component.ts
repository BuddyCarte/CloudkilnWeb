import {Component, OnInit} from '@angular/core';
import {ScadaData} from '../../@core/data/scada';
import {FactoryService} from '@app/@core/services/factory/factory.service';
import {Chamber, Device, Factory, Sensors} from '@app/@core/mode/scada';
import {DeviceService} from '@app/@core/services/device/device.service';
import * as moment from 'moment';
import {environment} from '@env/environment';
import {ToastrService} from '@app/@core/services/toastr.service';

@Component({
  selector: 'ngx-scada',
  templateUrl: './scada.component.html',
  styleUrls: ['./scada.component.scss'],
})
export class ScadaComponent implements OnInit {
  factory: Factory[] = [];
  sFactory: Factory;
  snapshot: any[] = [];
  sSnapshot: any;
  chamber: Chamber[];
  sChamber: any[];
  device: Device[];
  sDevice: any[];

  dataDevices: Device[] = [];
  dataSensors: Sensors[] = [];

  selectedOption = 'All';
  highlightRow: number;

  rbGroupsOptions = [
    {value: 'All', label: 'Tất cả', checked: true},
    {value: 'Alarm', label: 'Chỉ cảnh báo'},
  ];


  // config table
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.snapshot.length,
  };

  public maxSize: number = 3;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };
  //

  isShowChamber = false;

  frDate = new Date();
  toDate = moment(new Date()).add(1, 'days');


  constructor(private service: ScadaData
    , private factoryService: FactoryService
    , private toastrService: ToastrService
    , private devicesService: DeviceService) {
  }

  async ngOnInit() {
    this.getDataFactory();
    this.getDataDevices();
  }


  // get all factory
  async getDataFactory() {
    await this.factoryService.doSelect().subscribe(rs => {
      this.factory = rs.data;
      if (this.factory !== undefined && this.factory.length > 0) this.sFactory = this.factory[0];
      this.getDataChamber();
    }, () => {
      this.toastrService.errorToastr('Internal server error');
    });
  }

  // get chamber by factory
  async getDataChamber() {
    this.chamber = [];
    const data = {
      'factory_name': this.sFactory.factory_name,
    };
    await this.factoryService.getChamberByName(data).subscribe(rs => {
      this.chamber = rs.data;
    }, () => {
      this.toastrService.errorToastr('Internal server error');
    });
  }

  getDataDevices() {
    this.devicesService.getData().subscribe(rs => {
      this.device = rs.data;
      this.device.forEach(e => {
        e.checked = 1;
      });
    }, () => {
      this.toastrService.errorToastr('Internal server error');
    });
  }


  search() {
    if (this.validateBeforeSearch()) {
      this.isShowChamber = true;
      this.dataDevices = [];
      this.dataSensors = [];
      const data = {
        nap_id: this.sSnapshot.snap_id,
        log_time: this.sSnapshot.log_time,
        chamber: this.sChamber[0].code,
        factory: this.sFactory.factory_name,
        choice: this.selectedOption,
      };
      this.devicesService.doSearchDetails(data).subscribe(rs => {


        this.dataDevices = rs.data_devices;
        this.dataSensors = rs.data_sensors;

        const devicesInfo = rs.devices_info;
        const stateDefinition = rs.state_definition;

        this.dataDevices.forEach(device => {
          const deviceInfo = devicesInfo.find((d) => device.device_name === d.device_name);
          const deviceState = stateDefinition.find((s) => device.value === s.value);
          if (deviceInfo !== 'undefined') {
            device.img = environment.serverImgPath + deviceInfo.img;
            device.device_desc = deviceInfo.device_desc;
          }
          if (deviceState !== 'undefined') {
            device.state = deviceState.state;
            device.backgroundColor = deviceState.background_color;
            device.desc = deviceState.desc;
          }
        });

        this.dataSensors.forEach((sensor) => {
          const deviceInfo = devicesInfo.find((d) => sensor.device_name === d.device_name);
          sensor.img = environment.serverImgPath + deviceInfo.img;
          sensor.device_desc = deviceInfo.device_desc;
        });
      }, () => {
        // this.alertService.error('Internal server error');
      });
    }
  }

  validateBeforeSearch(): boolean {
    if (this.sChamber === undefined || this.sChamber.length === 0) {
      this.toastrService.errorToastr('Chưa chọn chamber');
      return false;
    }
    return true;
  }

  onChangeSnapshot(e, index) {
    this.sSnapshot = e;
    this.highlightRow = index;
    this.search();
  }

  changeFactory(f) {
    if (this.sFactory !== f) {
      this.sFactory = f;
      this.getDataChamber();
    }
  }

  changeChamber(c) {
    if (this.sChamber !== c) {
      this.sChamber = c;
      this.getDataSnapshot();
    }
  }

  getDataDevicesByChamber(c) {
    const data = this.dataDevices;
    const dataDevices = [];
    data.forEach(i => {
      if (i.chamber === c.code) {
        dataDevices.push({...i});
      }
    });
    return dataDevices;
  }


  getDataSensorsByChamber(c) {
    const data = this.dataSensors;
    const dataSensors = [];
    data.forEach(i => {
      if (i.chamber === c.code) {
        dataSensors.push({...i});
      }
    });
    return dataSensors;
  }


  showHideDetails(checked: boolean, d: any) {
    for (let i = 0; i < this.device.length; i++) {
      if (this.device[i].id === d.id) {
        this.device[i].checked = checked ? 1 : 0;

        break;
      }
    }
  }

  isShowDevice(element) {
    const device = this.device.find(e => e.device_name === element.device_name);
    if (device !== undefined) {
      return device.checked === 1 ? 'flex' : 'none';
    }
    return 'none';
  }

  onPageChange(event) {
    this.config.currentPage = event;
  }

  getDataSnapshot() {
    const data = {
      factory: this.sFactory.factory_name,
      chamber: this.sChamber[0].code,
      start_date: moment(this.frDate).format('YYYY/MM/DD'),
      end_date: moment(this.toDate).format('YYYY/MM/DD'),
    };
    this.devicesService.getDataSnapshot(data).subscribe(rs => {
      this.snapshot = rs.data;
    }, () => {
      this.toastrService.errorToastr('Internal server error');
    });
  }

}

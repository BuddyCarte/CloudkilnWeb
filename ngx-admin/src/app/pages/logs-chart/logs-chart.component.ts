import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {ScadaData} from '../../@core/data/scada';
import {Chamber, Factory, Snapshot} from '@app/@core/mode/scada';
import {FactoryService} from '@app/@core/services/factory/factory.service';
import {ToastrService} from '@app/@core/services/toastr.service';
import {DeviceService} from '@app/@core/services/device/device.service';
import * as moment from 'moment';
import {Chart} from 'chart.js';

@Component({
  selector: 'ngx-logs-chart',
  templateUrl: './logs-chart.component.html',
  styleUrls: ['./logs-chart.component.scss'],
})
export class LogsChartComponent implements AfterViewInit, OnDestroy {
  dataChartDevices: {
    labels: any,
    datasets: any,
  };
  dataChartSensors: {
    labels: any,
    datasets: any
  };
  options: any;
  themeSubscription: any;
  canvas: any;
  ctx: any;
  @ViewChild('chartDevices') chartDevices;
  @ViewChild('chartSensor') chartSensor;

  dataSourceDevices: any;
  dataSourceSensors: any;


  items = [
    {title: 'Sensors', children: [{title: 'Total Time'}, {title: 'Phase'}, {title: 'Phase Time'}]},
    {title: 'Automation'},
    {title: 'Relay FanCW'},
    {title: 'Relay Alarm'},
    {title: 'Relay Heat Open'},
  ];

  factory: Factory[] = [];
  sFactory: Factory;
  chamber: Chamber[];
  sChamber: any[];
  snapshot: Snapshot[] = [];
  frDate = new Date();
  toDate = new Date();
  countCycle = 1;
  timeType = '0';

  // config table
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.snapshot.length,
  };

  public maxSize: number = 3;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    // previousLabel: '<--',
    // nextLabel: '-->',
    // screenReaderPaginationLabel: 'Pagination',
    // screenReaderPageLabel: 'page',
    // screenReaderCurrentLabel: `You're on page`,
  };

  constructor(private theme: NbThemeService
    , private factoryService: FactoryService
    , private devicesService: DeviceService
    , private toastrService: ToastrService
    , private service: ScadaData) {
    // this.factory = service.getDataFactory();
    this.getDataFactory();
    this.dataSourceDevices = [];
    this.dataSourceSensors = [];
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

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    // this.themeSubscription.unsubscribe();
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
    }
  }

  changeTimeType(timeType) {
    this.timeType = timeType;
    if (timeType === '1') {
      this.frDate = this.addDays(this.toDate, -1 * this.countCycle);
    } else if (timeType === '2') {
      this.frDate = this.addDays(this.toDate, -7 * this.countCycle);
    } else if (timeType === '3') {
      this.frDate = this.addDays(this.toDate, -30 * this.countCycle);
    } else if (timeType === '4') {
      this.frDate = this.addDays(this.toDate, -365 * this.countCycle);
    }
  }

  changeCountCycle(countCycle) {
    this.countCycle = countCycle;
    if (this.timeType === '1') {
      this.frDate = this.addDays(this.toDate, -1 * countCycle);
    } else if (this.timeType === '2') {
      this.frDate = this.addDays(this.toDate, -7 * countCycle);
    } else if (this.timeType === '3') {
      this.frDate = this.addDays(this.toDate, -30 * countCycle);
    } else if (this.timeType === '4') {
      this.frDate = this.addDays(this.toDate, -365 * countCycle);
    }
  }

  addDays(fromDate: Date, days: number): Date {
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + days);
    return toDate;
  }

  getData() {
    if (this.validateBeforeGetData()) {
      this.dataSourceDevices = [];
      this.dataSourceSensors = [];
      this.snapshot = [];
      const data = {
        factory: this.sFactory.factory_name,
        chamber: this.sChamber[0].code,
        start_date: moment(this.frDate).format('YYYY/MM/DD'),
        end_date: moment(this.toDate).format('YYYY/MM/DD'),
      };
      let dataChartDevices = [];
      let dataChartSensors = [];
      let dataDevicesInfo = [];
      this.devicesService.getDataSnapshot(data).subscribe(rs => {
        if (rs.data.length > 0) {
          this.snapshot = rs.data.sort((a, b) => {
            // @ts-ignore
            return moment(a.log_time, 'YYYY-MM-DD HH:mm:ss') - moment(b.log_time, 'YYYY-MM-DD HH:mm:ss');
          });
        }
        dataChartDevices = rs.data_devices;
        dataChartSensors = rs.data_sensors;
        dataDevicesInfo = rs.devices_info;

      }, () => {
        this.toastrService.errorToastr('Internal server error');
      }, () => {

        this.buildChart(dataChartDevices, dataChartSensors, dataDevicesInfo);
      });
    }
  }

  validateBeforeGetData() {
    if (this.sChamber === undefined || this.sChamber.length === 0) {
      this.toastrService.errorToastr('Chưa chọn chamber');
      return false;
    }
    return true;
  }


  buildChart(dataChartDevices, dataChartSensors, dataDevicesInfo) {
    const dataLabels = [];
    this.snapshot.forEach(e => dataLabels.push(
      {
        label: '(' + e.snap_id + ') ' + e.log_time,
      }));
    const dataSetDevices = [];
    const dataSetSensor = [];

    let data = [];
    dataDevicesInfo.forEach(i => {
      const device = dataChartDevices.find(d => d.device_name === i.device_name);
      if (device !== undefined) {
        data = [];
        this.snapshot.forEach(s => {
          dataChartDevices.forEach(d => {
            if (s.snap_id === d.snap_id && d.device_name === i.device_name) {
              data.push({
                value: d.value,
              });
            }
          });
        });
        dataSetDevices.push({
          seriesname: device.device_name + '-' + device.device_attribute,
          data: data,
          valueFontColor: i.background,
          // borderColor: i.background,
          // backgroundColor: i.background,
          // fill: false,
          // pointRadius: 0,
          // pointHoverRadius: 0,
        });
      }
    });
    const mySet: Set<string> = new Set<string>();

    dataChartSensors.forEach(e => {
      mySet.add(e.device_name + '-' + e.device_attribute);
    });
    mySet.forEach(e => {
      const value = e.split('-');
      const device = dataDevicesInfo.find(d => d.device_name === value[0]);
      data = [];
      this.snapshot.forEach(s => {
        dataChartSensors.forEach(d => {
          if (s.snap_id === d.snap_id
            && d.device_name === value[0]
            && d.device_attribute === value[1]) {
            data.push({
              value: d.value,
            });
          }
        });
      });

      dataSetSensor.push({
        seriesname: e,
        data: data,
        valueFontColor: device.background,
        // borderColor: device.background,
        // backgroundColor: device.background,
        // fill: false,
        // pointRadius: 0,
        // pointHoverRadius: 0,
      });
    });
    this.dataChartDevices = {
      labels: dataLabels,
      datasets: dataSetDevices,
    };

    this.dataChartSensors = {
      labels: dataLabels,
      datasets: dataSetSensor,
    };

    if (this.dataChartDevices.datasets.length > 0) {
      this.drawChart(this.dataChartDevices, 'd');
    }
    if (this.dataChartSensors.datasets.length > 0) {
      this.drawChart(this.dataChartSensors, 's');
    }


    // this.drawChart(this.dataChartDevices, this.chartDevices);
    // this.drawChart(this.dataChartSensors, this.chartSensor);

  }

  onPageChange(event) {
    this.config.currentPage = event;
  }


  drawChart(data, chart) {
    // this.canvas = element.nativeElement;
    // this.ctx = this.canvas.getContext('2d');
    // new Chart(this.ctx, {
    //   type: 'line',
    //   data: data,
    //   options: {
    //     responsive: true,
    //     legend: {
    //       position: 'bottom',
    //     },
    //     hover: {
    //       mode: 'index',
    //     },
    //     scales: {
    //       xAxes: [
    //         {
    //           display: true,
    //           scaleLabel: {
    //             display: true,
    //             labelString: 'Time',
    //           },
    //           gridLines: {
    //             display: false,
    //           },
    //           ticks: {},
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           display: true,
    //           // scaleLabel: {
    //           //   display: true,
    //           //   labelString: 'Value',
    //           // },
    //           gridLines: {
    //             display: false,
    //           },
    //           ticks: {
    //             // reverse: false,
    //             // display: false,
    //             stepSize: 100,
    //           },
    //         },
    //       ],
    //     }
    //     , animation: {
    //       onComplete: function () {
    //         if (!this.rectangleSet) {
    //           const scale = window.devicePixelRatio;
    //           const sourceCanvas = this.chart.canvas;
    //           const copyWidth = this.chart.chart.scales['y-axis-0'].width - 10;
    //           const copyHeight = this.chart.chart.scales['y-axis-0'].height + this.scales['y-axis-0'].top + 10;
    //
    //           const sourceCtx = sourceCanvas.getContext('2d');
    //           // Normalize coordinate system to use css pixels.
    //           sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
    //           // sourceCtx.clearRect(0, 0, copyWidth * scale, 500 );
    //           this.rectangleSet = true;
    //         }
    //       },
    //       onProgress: function () {
    //         if (this.rectangleSet === true) {
    //           const copyWidth = this.chart.chart.scales['y-axis-0'].width;
    //           const copyHeight =
    //             this.chart.chart.scales['y-axis-0'].height +
    //             this.chart.chart.scales['y-axis-0'].top +
    //             10;
    //           const sourceCtx = this.chart.canvas.getContext('2d');
    //           sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
    //         }
    //       },
    //     },
    //   },
    //
    // });
    const _data = {
      chart: {
        // caption: "Deaths reported because of mosquito bites in India",
        // subcaption: "(As per government records)",
        showvalues: '0',
        numvisibleplot: '12',
        plottooltext:
          '<b>$dataValue</b> : $label',
        theme: 'fusion',
        bgColor: '#151a30',
      },
      categories: [{
        category: data.labels,
      }],
      dataset: data.datasets,
    };
    if (chart === 'd') {
      this.dataSourceDevices = _data;
    } else {
      this.dataSourceSensors = _data;
    }
  }
}

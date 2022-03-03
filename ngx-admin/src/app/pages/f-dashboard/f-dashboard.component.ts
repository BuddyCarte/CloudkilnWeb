import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbColorHelper, NbThemeService} from '@nebular/theme';
import {DashboardService} from '@app/@core/services/dashboard/dashboard.service';
import {Dashboard} from "@app/@core/mode/scada";
import * as moment from "@node_modules/moment";

@Component({
  selector: 'ngx-f-dashboard',
  templateUrl: './f-dashboard.component.html',
  styleUrls: ['./f-dashboard.component.scss'],
})
export class FDashboardComponent implements OnInit, OnDestroy {
  options_area_stack: any = {};
  data_pie: any;
  options_pie: any = {};

  data_lineChart: {};
  options_lineChart: any;

  echartsIntance: any;

  themeSubscription: any;

  data: Dashboard = new Dashboard();

  constructor(private theme: NbThemeService, private dashboardService: DashboardService) {
    dashboardService.getData().subscribe(res => {
      this.data = res;
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const _echarts: any = config.variables.echarts;
        const _chartjs: any = config.variables.chartjs;
        if (res.SNAPSHOT_DATA.length > 0) {
          let data_area_chart = [];
          let labels = [];
          res.SNAPSHOT_DATA.forEach(item => {

            item.data.forEach(data => {
              let logTime = data.log_time;
              if (!labels[logTime]) {
                labels.push(logTime);
              }
            });
          });

          labels.sort((a, b) => {
            // @ts-ignore
            return moment(a, 'YYYY-MM-DD') - moment(b, 'YYYY-MM-DD');
          });

          res.SNAPSHOT_DATA.forEach(item => {
            let data = [];
            labels.forEach(label => {
              let value = item.data.find(data => data.log_time === label);
              data.push(value ? value.total : 0);
            });


            data_area_chart.push({
              name: item.chamber,
              type: 'line',
              stack: 'Total amount',
              areaStyle: {normal: {opacity: _echarts.areaOpacity}},
              data: data,
            });
          });

          labels.sort((a, b) => {
            // @ts-ignore
            return moment(a, 'YYYY-MM-DD') - moment(b, 'YYYY-MM-DD');
          });

          this.options_area_stack = {
            backgroundColor: _echarts.bg,
            color: [colors.primaryLight, colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: _echarts.tooltipBackgroundColor,
                },
              },
            },
            legend: {
              position: 'bottom',
              textStyle: {
                color: _echarts.textColor,
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: labels,
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: _echarts.axisLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: _echarts.textColor,
                  },
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: _echarts.axisLineColor,
                  },
                },
                splitLine: {
                  lineStyle: {
                    color: _echarts.splitLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: _echarts.textColor,
                  },
                },
              },
            ],
            series: data_area_chart,
          };
        }


        this.data_pie = {
          labels: ['Pha 1', 'Pha 2', 'Pha 3', 'Pha 4', 'Pha 5', 'Không hoạt động'],
          datasets: [{
            data: [11, 22, 33, 10, 4, 8,],
            backgroundColor: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight, 'red'],
          }],
        };

        this.options_pie = {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
          legend: {
            labels: {
              fontColor: _chartjs.textColor,
            },
            position: 'right',
          },
        };


        const visitorsPie: any = config.variables.visitorsPie;
        const visitorsPieLegend: any = config.variables.visitorsPieLegend;

        this.data_lineChart = {
          labels: ['0', '72', '168', '240', '336', '432', '480'],
          datasets: [{
            label: 'Giảm ẩm thực tế',
            data: [
              40,
              28,
              22,
              18,
              16,
              12,
              10,
            ],
            borderColor: colors.primary,
            // backgroundColor: colors.primary,
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0),
            fill: false,
            // borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            lineTension: 0,
          }, {
            label: 'RH',
            data: [
              60,
              50,
              50,
              40,
              40,
              25,
              25,
            ],
            borderColor: colors.warning,
            // backgroundColor: colors.dangerLight,
            backgroundColor: NbColorHelper.hexToRgbA(colors.warning, 0),
            fill: false,
            // borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            lineTension: 0,
          }, {
            label: 'Nhiệt Độ',
            data: [
              40,
              50,
              60,
              60,
              60,
              60,
              60,
            ],
            borderColor: colors.success,
            // backgroundColor: colors.info,
            backgroundColor: NbColorHelper.hexToRgbA(colors.success, 0),
            fill: false,
            pointRadius: 0,
            // borderDash: [5, 5],
            pointHoverRadius: 0,
            lineTension: 0,
          },
          ],
        };
        this.options_lineChart = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
            labels: {
              fontColor: _chartjs.textColor,
            },
          },
          hover: {
            mode: 'index',
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Thời gian (h)',
                },
                gridLines: {
                  display: true,
                  color: _chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: _chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Nhiệt độ',
                },
                gridLines: {
                  display: true,
                  color: _chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: _chartjs.textColor,
                },
              },
            ],
          },
        };


      });
    });


  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}

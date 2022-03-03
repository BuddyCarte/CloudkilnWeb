/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule, NbCheckboxModule, NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule, NbIconModule, NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule,
  NbSidebarModule,
  NbToastrModule, NbTreeGridModule,
  NbWindowModule,
} from '@nebular/theme';
import {ScadaComponent} from './pages/scada/scada.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {LogsChartComponent} from './pages/logs-chart/logs-chart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ChartModule} from 'angular2-chartjs';
import {UserManagementComponent} from './pages/user-management/user-management.component';
import {FactoryManagementComponent} from './pages/factory-management/factory-management.component';
import {FDashboardComponent} from './pages/f-dashboard/f-dashboard.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {ECommerceModule} from './pages/e-commerce/e-commerce.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {NgxPaginationModule} from 'ngx-pagination';
import {FusionChartsModule} from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { InterceptorModule } from './intercepter.module';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    ScadaComponent,
    LogsChartComponent,
    UserManagementComponent,
    FactoryManagementComponent,
    FDashboardComponent,
    LoginComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        NbCardModule,
        NbSelectModule,
        NbRadioModule,
        NbInputModule,
        NbCheckboxModule,
        Ng2SmartTableModule,
        NbTreeGridModule,
        NgxEchartsModule,
        ChartModule,
        NbButtonModule,
        NbContextMenuModule,
        NbActionsModule,
        PieChartModule,
        ECommerceModule,
        NbIconModule,
        NbAlertModule,
        ReactiveFormsModule,
        FormsModule,
        SocialLoginModule,
        NgxPaginationModule,
        FusionChartsModule,
        InterceptorModule.forRoot()
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '155431914025-of7ogka293p11mm2327v4lvp71ljsisd.apps.googleusercontent.com',
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

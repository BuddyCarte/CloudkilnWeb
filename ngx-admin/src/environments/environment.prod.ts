/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {HttpHeaders} from '@angular/common/http';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverUrl: {
    // Monitor
    factoryService: 'http://api.cloudfactory.vn/v1/factory/',
    devicesService: 'http://api.cloudfactory.vn/v1/devices/',
    dashboardService: 'http://api.cloudfactory.vn/v1/dashboard/',
  },
  // Api factory
  baseApiUrl: 'http://api.cloudfactory.vn',
  dateFormatCalendar: 'dd/mm/yy',
  dateFormat: 'dd/MM/yyyy',
  dateFormat_vn: 'dd/MM/yyyy HH:mm:ss',
  // rowsPerPageOptions: [5, 10, 20],
  // pageDefault: 1,
  // first: 0,
  // rowsDefault: 10,
  // rowsModal: 5,
  serverImgPath: 'http://monitor.cloudkiln.net/public/img/factory',
};

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }),
};


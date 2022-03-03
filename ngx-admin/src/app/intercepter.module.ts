import { NgModule, ModuleWithProviders } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {AppInterceptor} from './app.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class InterceptorModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: InterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor, multi: true }]
    };
  }
}

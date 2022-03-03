import {Injectable} from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Injectable({providedIn: 'root'})
export class ToastrService {
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  constructor(private _toastrService: NbToastrService) {
  }


  errorToastr(content: string) {
    this.showToast('danger', 'Error', content);
  }

  warningToastr(content: string) {
    this.showToast('warning', 'Warning', content);
  }

  successToast(content: string) {
    this.showToast('success', 'Success', content);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this._toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup} from '@angular/forms';
import {FactoryService} from '@app/@core/services/factory/factory.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-dialog-factory-add-edit',
  templateUrl: 'dialog-factory-add-edit.component.html',
  styleUrls: ['dialog-factory-add-edit.component.scss'],
})
export class DialogFactoryAddEditComponent implements OnInit {
  @Input() title: String;
  @Input() test: String;
  @Input() data: any;
  status: any;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    factoryName: new FormControl(''),
    factoryDescription: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    factoryDiagram: new FormControl(''),
    userNameWS: new FormControl(''),
    passwordWS: new FormControl(''),
    status: new FormControl(''),
    ipFactory: new FormControl(''),
    timeZone: new FormControl(''),
  });

  isUpdate: boolean = false;

  constructor(
    protected ref: NbDialogRef<DialogFactoryAddEditComponent>,
    private factoryService: FactoryService,
    private toastrService: NbToastrService
  ) {
  }

  cancel() {
    this.ref.close(true);
  }

  submit() {
    const data = {
      id: this.form.value.id,
      factory_name: this.form.value.factoryName,
      factory_description: this.form.value.factoryDescription,
      phone: this.form.value.phone,
      address: this.form.value.address,
    };

    if(!this.isUpdate) {
      this.factoryService.save(data).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.ref.close(true);

      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
        this.ref.close(false);
      },
    );
    } else {
      this.factoryService.update(data).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.ref.close(true);

      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
        this.ref.close(false);
      },
    );
    }
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      this.isUpdate = true;
      this.form.patchValue({
        id: this.data.id,
        factoryName: this.data.factory_name,
        factoryDescription: this.data.factory_description,
        phone: this.data.phone,
        address: this.data.address,
        factoryDiagram: this.data.factory_diagram,
        userNameWS: this.data.username_ws,
        passwordWS: this.data.password_ws,
        status: this.data.status,
        ipFactory: this.data.ip_factory,
        timeZone: this.data.timezone,
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {FactoryData} from '../../@core/data/factory';
import {DialogFactoryAddEditComponent} from './factory-add-or-edit/dialog-factory-add-edit.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FactoryService} from '@app/@core/services/factory/factory.service';

@Component({
  selector: 'ngx-factory-management',
  templateUrl: './factory-management.component.html',
  styleUrls: ['./factory-management.component.scss'],
})
export class FactoryManagementComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit"></i></i>',
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash"></i></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      attr: {
        class: 'table_custom_settings',
      },
    },

    columns: {
      factory_name: {
        title: 'Tên nhà máy',
        type: 'string',
        filter: false,
      },
      fullname: {
        title: 'Mô tả',
        type: 'string',
        filter: false,
      },
      // phone: {
      //   title: 'Phone Number',
      //   type: 'string',
      //   filter: false,
      // },
      // factoryDiagram: {
      //   title: 'Factory Diagram',
      //   type: 'string',
      //   filter: false,
      // },
      // userNameWS: {
      //   title: 'User Name',
      //   type: 'string',
      //   filter: false,
      // },
      // ipFactory: {
      //   title: 'IP Factory',
      //   type: 'string',
      //   filter: false,
      // },
      // timeZone: {
      //   title: 'Time Zone',
      //   type: 'string',
      //   filter: false,
      // },
      status: {
        title: 'Trạng thái',
        type: 'number',
        filter: false,
        valuePrepareFunction: (status) => {
          let rs = '';
          switch (status) {
            case 0  :
              rs = 'WAITING';
              break;
            case 1  :
              rs = 'ACTIVE';
              break;
            case 2  :
              rs = 'PENDING';
              break;
            case 3  :
              rs = 'EXPIRED';
              break;
            default :
              rs = 'WAITING';
          }
          return rs;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any[];

  constructor(
    private service: FactoryData,
    private dialogService: NbDialogService,
    private factoryService: FactoryService,
    private toastrService: NbToastrService,
  ) {
    this.getFactories();
  }

  ngOnInit(): void {
  }

  // get all factory
  async getFactories() {
    await this.factoryService.getFactories().subscribe(rs => {
      this.source.load(rs.data);
    }, () => {
      this.toastrService.show('Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
    });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.factoryService.delete(event.data.id).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.getFactories();
      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
      },
    );
    } else {
      event.confirm.reject();
    }
  }

  openDialogAddFactory() {
    this.dialogService.open(DialogFactoryAddEditComponent, {
      context: {
        title: 'Thêm mới nhà máy',
        test: 'thanhpham',
      },
    }).onClose.subscribe(o => {
      if(o) {
        this.getFactories();
      }
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'editAction':
        this.editRecord(event.data);
        break;
      case 'deleteAction':
        this.onDeleteConfirm(event);
        break;
    }
  }

  public editRecord(formData: any) {
    this.dialogService.open(DialogFactoryAddEditComponent, {
      context: {
        title: 'Sửa nhà máy',
        data: formData,
      },
    }).onClose.subscribe(o => {
      if(o) {
        this.getFactories();
      }
    });
  }
}

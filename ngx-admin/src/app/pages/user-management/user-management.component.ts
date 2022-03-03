import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserManagementData} from '../../@core/data/user-management';
import {UserAddOrEditComponent} from './user-add-or-edit/user-add-or-edit.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UserService } from '@app/@core/services/user/user.service';

@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

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
      username: {
        title: 'Tên Đăng Nhập',
        type: 'string',
        filter: false,
      },
      auth_type: {
        title: 'Loại Authen',
        type: 'number',
        filter: false,
        valuePrepareFunction: (authenType) => {
          let rs = '';
          switch (authenType) {
            case 1  :
              rs = 'Username/Password';
              break;
            case 2  :
              rs = 'Google';
              break;
            case 3  :
              rs = 'Facebook';
              break;
            default :
              rs = 'Username/Password';
          }
          return rs;
        },
      },
      fullname: {
        title: 'Họ Tên',
        type: 'string',
        filter: false,
      },
      phone: {
        title: 'Số Điện Thoại',
        type: 'string',
        filter: false,
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false,
      },
      user_type: {
        title: 'Quyền',
        type: 'number',
        filter: false,
        valuePrepareFunction: (userType) => {
          let rs = '';
          switch (userType) {
            case 1  :
              rs = 'Admin';
              break;
            case 2  :
              rs = 'Factory';
              break;
            case 3  :
              rs = 'Common';
              break;
            default :
              rs = 'Common';
          }
          return rs;
        },
      },
      status: {
        title: 'Status',
        type: 'number',
        filter: false,
        valuePrepareFunction: (status) => {
          let rs = '';
          switch (status) {
            case 0  :
              rs = 'InActive';
              break;
            case 1  :
              rs = 'Active';
              break;
            case 2  :
              rs = 'Pending';
              break;
            case 3  :
              rs = 'Service Expired';
              break;
            default :
              rs = 'InActive';
          }
          return rs;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any[];

  constructor(private service: UserManagementData, private dialogService: NbDialogService, private userService: UserService,
                private toastrService: NbToastrService) {
                  // this.data = service.getUserManagementData();
                  // this.source.load(this.data);
    this.getUsers();
  }

  ngOnInit(): void {
  }

  // get all factory
  async getUsers() {
    await this.userService.getUsers().subscribe(rs => {
      this.source.load(rs.data);
    }, () => {
      this.toastrService.show('Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
    });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.userService.delete(event.data.id).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.getUsers();
      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
      },
    );
    } else {
      event.confirm.reject();
    }
  }

  openAddDialog() {
    this.dialogService.open(UserAddOrEditComponent, {
      context: {
        title: 'Thêm mới người dùng',
      },
    }).onClose.subscribe(o => {
      const data = {
        id: o.id.value,
        userName: o.factoryName.value,
        authenType: o.factoryDescription.value,
        fullName: o.phone.value,
        phone: o.address.value,
        email: o.factoryDiagram.value,
        userType: o.userNameWS.value,
        status: o.status.value,
      };
      data.id = Math.random() * 100;
      this.data.push(data);
      this.source.load(this.data);
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
    this.dialogService.open(UserAddOrEditComponent, {
      context: {
        title: 'Edit Factory',
        data: formData,
      },
    }).onClose.subscribe(o => {
      if(o) {
        this.getUsers();
      }
    });
  }

  public deleteRecord(formData: any) {
    this.data = this.data.filter(e => formData.id !== e.id);
    setTimeout(() => {
      this.source.load(this.data);
    });
  }
}

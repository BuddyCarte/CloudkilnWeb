import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {FormControl, FormGroup} from '@angular/forms';
import { UserService } from '@app/@core/services/user/user.service';

@Component({
  selector: 'ngx-user-add-or-edit',
  templateUrl: './user-add-or-edit.component.html',
  styleUrls: ['./user-add-or-edit.component.scss'],
})
export class UserAddOrEditComponent implements OnInit {

  @Input() title: String;
  @Input() data: any;
  status: any;

  isUpdate: boolean = false;


  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    authenType: new FormControl(''),
    fullName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl(this.random()),
    status: new FormControl(''),
  });

  constructor(protected ref: NbDialogRef<UserAddOrEditComponent>,
    private userService: UserService,
    private toastrService: NbToastrService) {

  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    const data = {
      id: this.form.value.id,
      username: this.form.value.userName,
      password: this.form.value.password,
      fullname: this.form.value.fullName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      roles: this.form.value.userType,
    };

    if(!this.isUpdate) {
      this.userService.save(data).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.ref.close(true);

      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
        this.ref.close(false);
      },
    );
    } else {
      this.userService.update(data).subscribe(res => {
        this.toastrService.show(res['desc'], 'Thành công !', {status: 'success'});
        this.ref.close(true);

      },
      error => {
        this.toastrService.show(error, 'Có lỗi xảy ra, vui lòng liên hệ ban quản trị !', {status: 'danger'});
        this.ref.close(false);
      }
      );
    }
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      this.isUpdate = true;
      this.form.patchValue
      ({
        id: this.data.id,
        userName: this.data.username,
        password: this.data.password,
        authenType: this.data.auth_type,
        fullName: this.data.fullname,
        phone: this.data.phone,
        email: this.data.email,
        userType: this.data.user_type,
        status: this.data.status,
      });
    }
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}

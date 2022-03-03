import {Injectable} from '@angular/core';
import {UserManagementData} from '../data/user-management';

@Injectable()
export class UserManagementService extends UserManagementData {
  getUserManagementData(): any[] {
    return this.data;
  }

  data = [
    {
      id: 1,
      userName: 'thanhpham',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 2,
      userName: 'thanhpham2',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 3,
      userName: 'thanhpham3',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 4,
      userName: 'thanhpham4',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 5,
      userName: 'thanhpham5',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 6,
      userName: 'thanhpham6',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 7,
      userName: 'thanhpham7',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 8,
      userName: 'thanhpham8',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 9,
      userName: 'thanhpham9',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 10,
      userName: 'thanhpham10',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
    {
      id: 11,
      userName: 'thanhpham11',
      authenType: 2,
      fullName: 'Phạm Tiến Thành',
      phone: '0979462251',
      email: 'k58cntt@gmail.com',
      userType: 1,
      status: 1,
    },
  ];
}

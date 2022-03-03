import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    link: '/pages/f-dashboard',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'Quản lý người dùng',
    link: '/pages/user-management',
    icon: 'person-done-outline',
  },
  {
    title: 'Quản lý nhà máy',
    link: '/pages/factory-management',
    icon: 'award-outline',
  },
  {
    title: 'MONITOR',
    group: true,
  },
  {
    title: 'Trạng thái thiết bị',
    link: '/pages/scada',
    icon: 'sun-outline',
  },
  {
    title: 'Biểu đồ logs',
    link: '/pages/logs-chart',
    icon: 'pie-chart-outline',
  },
];

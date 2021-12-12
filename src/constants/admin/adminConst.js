import {
  Group,
  HowToReg,
  PeopleAlt,
  ShoppingCart,
  ShowChart,
  StoreOutlined,
  TwoWheeler,
} from '@mui/icons-material';

export const MENU_ADMIN = [
  {
    text: 'Employees',
    icon: <Group />,
    link: '/admin/employees',
  },
  {
    text: 'Users Permission',
    icon: <PeopleAlt />,
    link: '/admin/users',
  },
  // {
  //   text: 'Roles Permission',
  //   icon: <HowToReg />,
  //   link: '/admin/roles',
  // },
  {
    text: 'Revenues Statistical',
    icon: <ShowChart />,
    link: '/admin/statistical',
  },
  {
    text: 'Shoes',
    icon: <StoreOutlined />,
    link: '/admin/shoes',
  },
  {
    text: 'Order',
    icon: <ShoppingCart />,
    link: '/admin/orders',
  },
  {
    text: 'Shipper',
    icon: <TwoWheeler />,
    link: '/admin/shippers',
  },
];

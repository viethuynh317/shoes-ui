import { StoreOutlined, ShoppingCart, TwoWheeler } from '@mui/icons-material';

export const MENU_EMPLOYEE = [
  {
    text: 'Shoes',
    icon: <StoreOutlined />,
    link: '/employee/shoes',
  },
  {
    text: 'Order',
    icon: <ShoppingCart />,
    link: '/employee/orders',
  },
  {
    text: 'Shipper',
    icon: <TwoWheeler />,
    link: '/employee/shippers',
  },
];

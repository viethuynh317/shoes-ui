import { lazy } from 'react';

export const publicRoutes = [
  {
    key: 'signIn',
    exact: true,
    path: '/auth/sign_in',
    component: lazy(() => import('../features/auth/signIn/SignIn')),
  },
  {
    key: 'customerHomePage',
    exact: true,
    path: '/shoes',
    component: lazy(() => import('../features/customer/homepage/HomePage')),
  },
];

export const privateRoutes = [
  {
    key: 'productManagement',
    exact: true,
    path: '/admin/shoes',
    component: lazy(() =>
      import('../features/admin/components/ProductManagement/ProductManagement')
    ),
  },
  {
    key: 'addProduct',
    path: '/admin/shoes/add',
    exact: true,
    component: lazy(() => import('../components/EditProduct/EditProduct')),
  },
  {
    key: 'productDetail',
    path: '/admin/shoes/:id',
    exact: true,
    component: lazy(() => import('../components/ProductDetail/ProductDetail')),
  },
  {
    key: 'editProduct',
    path: '/admin/shoes/:id/edit',
    exact: true,
    component: lazy(() => import('../components/EditProduct/EditProduct')),
  },
];

import { lazy } from 'react';

export const publicRoutes = [
  {
    key: 'signIn',
    exact: true,
    path: '/auth/sign_in',
    component: lazy(() => import('../features/auth/signIn/SignIn')),
  },
  {
    key: 'forgotPassword',
    path: '/auth/forgot_password',
    exact: true,
    component: lazy(() =>
      import('../features/auth/component/ForgotPassword/ForgotPassword')
    ),
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
  {
    key: 'usersManagement',
    path: '/admin/users',
    exact: true,
    component: lazy(() =>
      import('../features/admin/components/UserManagement/UserManagement')
    ),
  },
  // {
  //   key: 'rolesManagement',
  //   path: '/admin/roles',
  //   exact: true,
  //   component: lazy(() =>
  //     import('../features/admin/components/RolesManagement/RolesManagement')
  //   ),
  // },
  {
    key: 'usersPermission',
    path: '/admin/users/:userId/permissions',
    exact: true,
    component: lazy(() =>
      import(
        '../features/admin/components/UserManagement/components/UserPermission'
      )
    ),
  },
  // {
  //   key: 'rolesPermission',
  //   path: '/admin/roles/:roleId/permissions',
  //   exact: true,
  //   component: lazy(() =>
  //     import(
  //       '../features/admin/components/RolesManagement/components/RolesPermission'
  //     )
  //   ),
  // },
  {
    key: 'employeesManagement',
    path: '/admin/employees',
    exact: true,
    component: lazy(() =>
      import(
        '../features/admin/components/EmployeeManagement/EmployeeManagement'
      )
    ),
  },
  {
    key: 'statistical',
    path: '/admin/statistical',
    exact: true,
    component: lazy(() =>
      import('../features/admin/components/Statistical/Statistical')
    ),
  },
  {
    key: 'orderManagement',
    path: '/admin/orders',
    exact: true,
    component: lazy(() =>
      import('../features/Employee/components/OrderManagement/OrderManagement')
    ),
  },
  {
    key: 'shipperManagement',
    path: '/admin/shippers',
    exact: true,
    component: lazy(() =>
      import(
        '../features/Employee/components/ShipperManagement/ShipperManagement'
      )
    ),
  },
  {
    key: 'profile',
    path: '/admin/profile',
    exact: true,
    component: lazy(() => import('../features/Profile/Profile/index')),
  },
  {
    key: 'changePassword',
    path: '/admin/change_password',
    exact: true,
    component: lazy(() => import('../features/Profile/ChangePassword/index')),
  },

  {
    key: 'feedbackManagement',
    path: '/admin/replys/:id',
    exact: true,
    component: lazy(() =>
      import(
        '../features/Employee/components/FeedbackManagement/components/ReplyFeedback/ReplyFeedback'
      )
    ),
  },
];

export const privateRoutesEmployee = [
  {
    key: 'shipperManagementEmployee',
    path: '/employee/shippers',
    exact: true,
    component: lazy(() =>
      import(
        '../features/Employee/components/ShipperManagement/ShipperManagement'
      )
    ),
  },
  {
    key: 'orderManagementEmployee',
    path: '/employee/orders',
    exact: true,
    component: lazy(() =>
      import('../features/Employee/components/OrderManagement/OrderManagement')
    ),
  },
  {
    key: 'productManagementEmployee',
    exact: true,
    path: '/employee/shoes',
    component: lazy(() =>
      import('../features/admin/components/ProductManagement/ProductManagement')
    ),
  },
  {
    key: 'addProductEmployee',
    path: '/employee/shoes/add',
    exact: true,
    component: lazy(() => import('../components/EditProduct/EditProduct')),
  },
  {
    key: 'productDetailEmployee',
    path: '/employee/shoes/:id',
    exact: true,
    component: lazy(() => import('../components/ProductDetail/ProductDetail')),
  },
  {
    key: 'editProductEmployee',
    path: '/employee/shoes/:id/edit',
    exact: true,
    component: lazy(() => import('../components/EditProduct/EditProduct')),
  },
  {
    key: 'profile',
    path: '/employee/profile',
    exact: true,
    component: lazy(() => import('../features/Profile/Profile/index')),
  },
  {
    key: 'changePassword',
    path: '/employee/change_password',
    exact: true,
    component: lazy(() => import('../features/Profile/ChangePassword/index')),
  },
];

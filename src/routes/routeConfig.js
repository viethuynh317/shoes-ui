import { lazy } from 'react';

export const guestRoutes = [
  {
    key: 'customerHomePage',
    exact: true,
    path: '/user/homepage',
    component: lazy(() => import('../features/customer/homepage/HomePage')),
  },
];

export const publicRoutesCustomer = [
  {
    key: 'customerSignIn',
    exact: true,
    path: '/user/sign-in',
    component: lazy(() => import('../features/customer/auth/SignIn/SignIn')),
  },
  {
    key: 'customerSignUp',
    exact: true,
    path: '/user/sign-up',
    component: lazy(() => import('../features/customer/auth/SignUp/SignUp')),
  },
];

export const privateRoutesCustomer = [
  {
    key: 'customerMyAccount',
    exact: true,
    path: '/user/my-account',
    component: lazy(() => import('../features/customer/MyAccount/MyAccount')),
  },
  {
    key: 'customerMyAccountOrders',
    exact: true,
    path: '/user/my-account/orders',
    component: lazy(() =>
      import(
        '../features/customer/MyAccount/components/CustomerOrders/CustomerOrders'
      )
    ),
  },
  {
    key: 'customerMyAccountDetail',
    exact: true,
    path: '/user/my-account/details',
    component: lazy(() =>
      import(
        '../features/customer/MyAccount/components/AccountDetail/AccountDetail'
      )
    ),
  },
  {
    key: 'customerMyAccountChangePassword',
    exact: true,
    path: '/user/my-account/change-password',
    component: lazy(() =>
      import(
        '../features/customer/MyAccount/components/ChangePassword/ChangePassword'
      )
    ),
  },
];

export const publicRoutes = [
  {
    key: 'signIn',
    exact: true,
    path: '/auth/sign-in',
    component: lazy(() => import('../features/auth/signIn/SignIn')),
  },
  {
    key: 'forgotPassword',
    path: '/auth/forgot-password',
    exact: true,
    component: lazy(() =>
      import('../features/auth/component/ForgotPassword/ForgotPassword')
    ),
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
    path: '/admin/change-password',
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
    path: '/employee/change-password',
    exact: true,
    component: lazy(() => import('../features/Profile/ChangePassword/index')),
  },
];

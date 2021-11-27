import { lazy } from "react";

export const publicRoutes = [
  {
    key: "signIn",
    exact: true,
    path: "/auth/sign_in",
    component: lazy(() => import("../features/auth/signIn/SignIn")),
  },
  {
    key: "customerHomePage",
    exact: true,
    path: "/shoes",
    component: lazy(() => import("../features/customer/homepage/HomePage"))
  }
];

export const privateRoutes = [
  {
    key: "vehicleStores",
    exact: true,
    path: "/vehicle_stores",
    component: lazy(() =>
      import("../features/admin/components/vehicleStores/VehicleStores")
    ),
  },
];

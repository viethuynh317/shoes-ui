import { lazy } from "react";

export const publicRoutes = [
  {
    key: "signIn",
    exact: true,
    path: "/auth/sign_in",
    component: lazy(() => import("../features/auth/signIn/SignIn")),
  },
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

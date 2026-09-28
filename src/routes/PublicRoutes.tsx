import { Navigate, type RouteObject } from "react-router";
import { lazy } from "react";
import RoutesLoader from "@/components/RoutesLoader";

const Status404 = RoutesLoader(lazy(() => import("@/pages/status/Status404")));
const Status500 = RoutesLoader(lazy(() => import("@/pages/status/Status500")));
const StatusComingSoon = RoutesLoader(
  lazy(() => import("@/pages/status/StatusComingSoon")),
);
const StatusMaintenance = RoutesLoader(
  lazy(() => import("@/pages/status/StatusMaintenance")),
);

const publicRoutes: RouteObject[] = [
  {
    path: "status",
    children: [
      { index: true, element: <Navigate to="404" replace /> },
      { path: "404", element: <Status404 /> },
      { path: "500", element: <Status500 /> },
      { path: "maintenance", element: <StatusMaintenance /> },
      { path: "coming-soon", element: <StatusComingSoon /> },
    ],
  },
  {
    path: "*",
    element: <Status404 />,
  },
];

export default publicRoutes;

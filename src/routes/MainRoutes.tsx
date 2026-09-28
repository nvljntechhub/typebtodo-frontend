import { lazy } from "react";
import { type RouteObject } from "react-router";
import RoutesLoader from "@/components/RoutesLoader";
import AuthGuard from "@/routes/AuthGuard";

const TaskView = RoutesLoader(lazy(() => import("@/pages/task-view/TaskView")));

const mainRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: "",
        children: [
          {
            path: "/task-view",
            element: <TaskView />,
          },
        ],
      },
    ],
  },
];

export default mainRoutes;

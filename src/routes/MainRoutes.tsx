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
        // element: <FullLayout />,
        children: [
          {
            path: "/task-view",
            element: <TaskView />,
          },
          // {
          //   path: "/child",
          //   children: [
          //     {
          //       path: "",
          //       element: <Navigate to="/child/childComponent" replace />,
          //     },
          //     {
          //       path: "child",
          //       element: <ChildCoponent />,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
];

export default mainRoutes;

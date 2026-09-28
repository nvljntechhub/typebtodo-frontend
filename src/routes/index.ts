import { useRoutes } from "react-router";
import authRoutes from "./AuthRoutes";
import mainRoutes from "./MainRoutes";
import publicRoutes from "./PublicRoutes";

const TODORoutes = () =>
  useRoutes([...authRoutes, ...mainRoutes, ...publicRoutes]);

export default TODORoutes;

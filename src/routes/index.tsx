import { Navigate, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { PublicWrapper } from "../utils";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: (
      <PublicWrapper>
        <Home />
      </PublicWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];

export default routes;

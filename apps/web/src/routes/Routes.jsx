import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

const Home = lazy(() => import("../pages/main/Home"));
const About = lazy(() => import("../pages/main/About"));
const Objectives = lazy(() => import("../pages/main/Objectives"));
const Question = lazy(() => import("../pages/main/Question"));

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "objectives", element: <Objectives /> },
        { path: "question/:id", element: <Question /> }, // Ruta con parámetro dinámico
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },

    {
      path: "*",
      element: <div>404</div>,
    },
  ]);
};

export default Routes;

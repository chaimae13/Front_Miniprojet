import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Users from "../Pages/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "me", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "users", element: <ProtectedRoute><Users /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

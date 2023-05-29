import * as React from "react";
import {createBrowserRouter,} from "react-router-dom";
import UserLayout from "../pages/UserLayout";
import Login from "../pages/userPanel/Login";
import Register from "../pages/userPanel/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
]);

export default router;



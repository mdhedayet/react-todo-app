import * as React from "react";
import {createBrowserRouter,} from "react-router-dom";
import UserLayout from "../pages/UserLayout";
import Login from "../pages/userPanel/Login";
import Register from "../pages/userPanel/Register";
import Dashboard from "../pages/userPanel/Dashboard";
import Todo from "../pages/userPanel/Todo";


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
  {
    path: "/dashboard",
    element: <UserLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [       
          {
            path: "/dashboard/todo",
            element: <Todo />,
          },
        ],
      },
      

    ],
  }
]);

export default router;



import { createBrowserRouter } from "react-router-dom";
import React from "react";

import WelcomePage from "../components/welcome";
import HomePage from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
    
      {
        path: "login",
        element: <Login />,
      },
      // {
      //   path: "admin",
      //   element: <Admin />,
      // },
      {
        path: "signup",
        element: <Signup />,
      },
    
    ],
  },
  // {
  //   path: "/restaurant",
  //   element: <RestaurantBranches />,
  // },
]);

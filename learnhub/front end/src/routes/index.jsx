import { createBrowserRouter } from "react-router-dom";
import React from "react";

import WelcomePage from "../components/welcome";
import HomePage from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Allcourses from "../pages/allcourses";

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
      {
        path: "courses",
        element: <Allcourses />,
      },
    
    ],
  },
  // {
  //   path: "/restaurant",
  //   element: <RestaurantBranches />,
  // },
]);

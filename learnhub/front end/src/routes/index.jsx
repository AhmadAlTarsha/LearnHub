import { createBrowserRouter } from "react-router-dom";
import React from "react";

import WelcomePage from "../components/welcome";
import HomePage from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Allcourses from "../pages/TeacherPage/allcourses";
import Course from "../pages/TeacherPage/courses";

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
        element: <Course />,
      },
    
    ],
  },
  // {
  //   path: "/restaurant",
  //   element: <RestaurantBranches />,
  // },
]);

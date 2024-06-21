import { createBrowserRouter } from "react-router-dom";
import React from "react";

import WelcomePage from "../components/welcome";
import HomePage from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Courses from "../pages/StudentPage/S-courses";
import TeacherCourses from "../pages/TeacherPage/coursesList";

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
      {
        path: "all-courses",
        element: <Courses />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "teacher-dashboard",
        element: <TeacherCourses />,
      },
    
    ],
  },
  // {
  //   path: "/restaurant",
  //   element: <RestaurantBranches />,
  // },
]);

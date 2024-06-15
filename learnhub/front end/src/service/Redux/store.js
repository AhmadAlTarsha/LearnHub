import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import coursesReducer from "./courses";



export default configureStore({
    reducer: {
      auth: authReducer,
     courses:coursesReducer
    },
  });
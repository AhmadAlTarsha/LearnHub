import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import coursesReducer from "./auth";



export default configureStore({
    reducer: {
      auth: authReducer,
     courses:coursesReducer
    },
  });
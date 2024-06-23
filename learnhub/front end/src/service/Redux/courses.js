import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  addCourse,
  deleteCourse,
  editCourse,
  getCoursesById
} from "../APIS/courses-crud";

export const GetAllCourses = createAsyncThunk(
  "branch/get/r",
  async (payload) => {
    return await getAllCourses();
  }
);
export const GetCoursesById = createAsyncThunk(
  "branch/id/get/r",
  async (payload) => {

    return await getCoursesById(payload);
  }
);

export const AddCourseState = createAsyncThunk(
  "branch/add/r",
  async (payload) => {
    return await addCourse(payload);
  }
);
export const EditCourseState = createAsyncThunk(
  "branch/edit/r",
  async (payload) => {
    return await editCourse(payload);
  }
);

export const DeleteCourseState = createAsyncThunk(
  "branch/delete/r",
  async (payload) => {
    return await deleteCourse(payload);
  }
);

export const CourseSlice = createSlice({
  name: "courses",
  initialState: {
    isLoading: false,

    courses: [],
    allCourses:[],
    courseUpdate: false,
    snackBarMessage: "",
    snackBarStatus: "",
  },

  extraReducers: (builder) => {
    //===========================================================================GetAll cases
    builder
      .addCase(GetAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCourses = action.payload;
       
      })
      .addCase(GetAllCourses.rejected, (state, action) => {
        state.isLoading = true;
      });


    //==========================================================================Get By Id
    builder
      .addCase(GetCoursesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCoursesById.fulfilled, (state, action) => {

      
        state.isLoading = false;
        state.courses = action.payload;
       
      })
      .addCase(GetCoursesById.rejected, (state, action) => {
        state.isLoading = false;
      });
    //===============================================================================Edit cases
    builder
      .addCase(EditCourseState.pending, (state) => {
        state.courseUpdate = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(EditCourseState.fulfilled, (state, action) => {
      
        state.snackBarMessage = action.payload.message;
        state.courseUpdate = false;

        state.snackBarStatus = "success";
        state.courses = action.payload.course;
        state.errorMessage = {
          isError: false,
          message: " branch updated",
        };
      })
      .addCase(EditCourseState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error update branch"}`,
        };
        // state.colorUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
        state.courseUpdate = false;
      });

    //================================================================Add cases
    builder
      .addCase(AddCourseState.pending, (state) => {
        state.courseUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddCourseState.fulfilled, (state, action) => {
      
        state.branchUpdate = false;

        state.snackBarMessage = action.payload.message;
        state.courses = action.payload.course;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddCourseState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
      
          message: `${action.payload ?? "Error Adding Color"}`,
        };
        state.courseUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
      });

    //===================================================================Delete cases
    builder
      .addCase(DeleteCourseState.pending, (state) => {
        state.courseUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(DeleteCourseState.fulfilled, (state, action) => {
        state.courseUpdate = false;

        state.errorMessage = {
          isError: false,
          message: "",
        };
        state.courses = action.payload.course;
        state.snackBarMessage = action.payload.message;
        state.snackBarStatus = "success";
      })
      .addCase(DeleteCourseState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.error.message || "Error Deleting branches"}`,
        };

        state.snackBarMessage = action.error.message;
        state.snackBarStatus = "error";
      });
  },
});

export default CourseSlice.reducer;

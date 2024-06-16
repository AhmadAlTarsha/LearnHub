import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  addCourse,
  deleteCourse,
  editCourse,
  getCoursesById
} from "../APIS/courses";

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
    branchUpdate: false,
    snackBarMessage: "",
    snackBarStatus: "",
  },

  extraReducers: (builder) => {
    //===========================================================================GetAll cases
    // builder
    //   .addCase(GetAllCourses.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(GetAllCourses.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.courses = action.payload;
       
    //   })
    //   .addCase(GetAllCourses.rejected, (state, action) => {
    //     state.isLoading = true;
    //   });


    //==========================================================================Get By Id
    builder
      .addCase(GetCoursesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCoursesById.fulfilled, (state, action) => {

        console.log(action.payload);
        state.isLoading = false;
        state.courses = action.payload;
       
      })
      .addCase(GetCoursesById.rejected, (state, action) => {
        state.isLoading = true;
      });
    //===============================================================================Edit cases
    builder
      .addCase(EditCourseState.pending, (state) => {
        state.branchUpdate = true;
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(EditCourseState.fulfilled, (state, action) => {
        console.log(action.payload);
        state.snackBarMessage = action.payload.message;
        state.branchUpdate = false;

        state.snackBarStatus = "success";
        state.branches = action.payload.branches;
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
        state.branchUpdate = false;
      });

    // //================================================================Add cases
    builder
      .addCase(AddCourseState.pending, (state) => {
        state.branchUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(AddCourseState.fulfilled, (state, action) => {
        state.branchUpdate = false;

        state.snackBarMessage = action.payload.message;
        state.branches = action.payload.branches;
        state.snackBarStatus = "success";
        state.errorMessage = {
          isError: true,
          message: "Added Success",
        };
      })
      .addCase(AddCourseState.rejected, (state, action) => {
        state.errorMessage = {
          isError: true,
          // return err
          message: `${action.payload ?? "Error Adding Color"}`,
        };
        state.branchUpdate = false;
        state.snackBarStatus = "error";
        state.snackBarMessage = action.error.message;
      });

    //===================================================================Delete cases
    builder
      .addCase(DeleteCourseState.pending, (state) => {
        state.branchUpdate = true;

        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(DeleteCourseState.fulfilled, (state, action) => {
        state.branchUpdate = false;

        state.errorMessage = {
          isError: false,
          message: "",
        };
        state.branches = action.payload.branches;
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

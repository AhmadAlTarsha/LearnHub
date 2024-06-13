import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../../service/APIS/auth";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  return await UserLogin(credentials);
});

export const authSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    role: "",
    full_name: "",
    isLogin: false,
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
     

        localStorage.setItem(
          "token",
          JSON.stringify({
            id: action?.payload?.id,
            token: action?.payload?.token,
          })
        );

        localStorage.setItem(
          "localUser",
          JSON.stringify({
            id: action?.payload?.id,
            token: action?.payload?.token,
            isLoggedIn: true,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: "Email or Password is wrong",
        };
      });
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = {
        id: 0,
        fullName: "",
        nickName: "",
        token: "",
        email: "",
        image: "",
        role: 0,
        region: 0,
      };

      localStorage.removeItem("localUser");
      localStorage.removeItem("token");
    },
  },
});

export const { setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;

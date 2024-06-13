import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Login } from "../../service/APIS/auth";

export const UserLogin = createAsyncThunk("user/login", async (payload) => {

    return await Login(payload);
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

      .addCase(UserLogin.pending, (state) => {
        
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
     

        localStorage.setItem(
          "token",
          JSON.stringify({
            id: action?.payload?.id,
            token: action?.payload?.token,
            isLoggedIn: true,
            roleId:action?.payload?.role
          })
        );

localStorage.setItem("id",action.payload.id)
localStorage.setItem("role",action.payload.role)
localStorage.setItem("name",action.payload.full_name)
localStorage.setItem("isLogin",true)


state.id=localStorage.getItem("id")
state.role=localStorage.getItem("role")
state.full_name=localStorage.getItem("name")
state.isLogin=localStorage.getItem("isLogin")


        // localStorage.setItem(
        //   "localUser",
        //   JSON.stringify({
        //     id: action?.payload?.id,
        //     token: action?.payload?.token,
        //     isLoggedIn: true,
        //   })
        // );
      })
      .addCase(UserLogin.rejected, (state, action) => {

        console.log("error");
        state.errorMessage = {
          error: true,
          message: "Email or Password is wrong",
        };
      });
  },
  reducers: {
    setUser: (state, action) => {
   
        state.id=localStorage.getItem("id")
        state.role=localStorage.getItem("role")
        state.full_name=localStorage.getItem("name")
        state.isLogin=localStorage.getItem("isLogin")

    },
    setLogout: (state) => {
    //   state.user = {
    //     id: 0,
    //     fullName: "",
    //     nickName: "",
    //     token: "",
    //     email: "",
    //     image: "",
    //     role: 0,
    //     region: 0,
    //   };

    //   localStorage.removeItem("localUser");
    //   localStorage.removeItem("token");
    },
  },
});

export const { setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;

import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../service/Redux/auth";

function Navbar() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  dispatch(setUser());

  const authSelector = useSelector((state) => {
    return state.auth;
  });

  const handleLogout = () => {
    localStorage.clear();
    redirect("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(60, 60, 60)", mb: 4 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            LearnHub
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => {
              redirect("/");
            }}
          >
            Home
          </Button>
          {!authSelector.isLogin ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  redirect("/login");
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  redirect("/signup");
                }}
              >
                Sign Up for Free
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  redirect("/courses");
                }}
              >
                Courses
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              {authSelector.role === 2 ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    redirect("/teacher-dashboard");
                  }}
                >
                  Teacher Dashboard
                </Button>
              ) : (
                <Button color="inherit">Student</Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

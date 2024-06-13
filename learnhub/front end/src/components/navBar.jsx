import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router';

import {  useSelector,useDispatch } from "react-redux";
import{setUser} from "../service/Redux/auth"

function Navbar() {
 const redirect = useNavigate();
const dispatch=useDispatch()
 dispatch(setUser())


  const authSelector = useSelector((state) => {
    return state.auth;
  });

 

  const handleLogout = () => {
    localStorage.clear();
    redirect('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(83,92,112)', mb: 4 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" underline="none">
            <img src="Logo.svg" alt="Logo" style={{ width: '80px', position: 'relative', top: '-15px' }} />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={() => { redirect("/") }}>
            Home
          </Button>
          {!authSelector.isLogin ? (
            <>
              <Button color="inherit" onClick={() => { redirect("/login") }}>
                Login
              </Button>
              <Button color="inherit" onClick={() => { redirect("/signup") }}>
                Sign Up for Free
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => { redirect("/courses") }}>
                Courses
              </Button>
              {authSelector.role==2 ? (
                <Button color="inherit" onClick={() => { redirect("/teacher-dashboard") }}>
                  Teacher Dashboard
                </Button>
              ) : (
                <Button color="inherit">
                  Student
                </Button>
              )}
              {/* <Button color="inherit" onClick={() => { redirect("/my-courses") }}>
                My Courses
              </Button> */}
              
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

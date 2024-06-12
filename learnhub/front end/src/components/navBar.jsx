import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router';



function Navbar() {
//   const redirect = useNavigate();
 

  const handleLogout = () => {
    localStorage.clear();
    // setIsLogin(false);
    // setToken(null);
    // redirect('/');
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
          <Button color="inherit" >
            Home
          </Button>
          {!false ? (
            <>
              <Button color="inherit">
                Login
              </Button>
              <Button color="inherit" >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                Courses
              </Button>
              {true * 1 === 2 ? (
                <Button color="inherit" >
                  Teacher Dashboard
                </Button>
              ) : (
                <Button color="inherit">Student</Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

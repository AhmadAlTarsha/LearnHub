import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { Context } from '../../App';
import './Nav.css';

function Navbar() {
  const redirect = useNavigate();
  const { isLogin, setIsLogin, setToken, roleID } = useContext(Context);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    setToken(null);
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
          <Button color="inherit" onClick={() => redirect('/')}>
            Home
          </Button>
          {!isLogin ? (
            <>
              <Button color="inherit" onClick={() => redirect('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => redirect('/Register')}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => redirect('/courses')}>
                Courses
              </Button>
              {roleID * 1 === 2 ? (
                <Button color="inherit" onClick={() => redirect('/Teacher')}>
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

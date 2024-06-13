import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  CssBaseline,
} from "@mui/material";
import SimpleSnackbar from "../components/Snackbar";
// import jwt_decode from "jwt-decode"

const decode=require("jwt-decode")
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Snackbar,setSnackBar]=useState({
    text:"",
    status:""
  })
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelLogin=async()=>{
  try {
        const result = await axios.post("http://localhost:5001/users/login", {
          email: formData.email,
          password: formData.password,
        });

        if (!result.data.error) {

          
          localStorage.setItem("token",result?.data?.token)
          localStorage.setItem("id",result?.data?.id)
          localStorage.setItem("role",result?.data?.role)

          // localStorage.setItem(
          //   "token",
          //   JSON.stringify({
          //     id: result.token.id,
          //     token: result.token,
          //   })
          // );

         

          setSnackBar({
            text:result.data.message,
            status:"success"
          });
  
          setOpenSnackbar(true)
        }
        console.log(result);
      } catch (error) {
        setSnackBar({
          text:"wrong email or password",
          status:"error"
        });

        setOpenSnackbar(true)
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.email && formData.password) {
    handelLogin()
    } else {

      setSnackBar({
        text:"Missing email or password",
        status:"error"
      });

      setOpenSnackbar(true)
 
    }
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Log in to your account to continue learning and enhancing your skills.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ mt: -8, mb: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper elevation={6} sx={{ padding: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Log In
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Log In
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Typography variant="body2">
                          Don't have an account?{" "}
                          <Link to="/signup">Sign up</Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={Snackbar.text}
        status={Snackbar.status}
      />
    </div>
  );
}

export default Login;

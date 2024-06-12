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

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.email && formData.password) {
      try {
        const result = await axios.post("http://localhost:5001/users/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(result);
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      console.log("Missing email or password");
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
    </div>
  );
}

export default Login;

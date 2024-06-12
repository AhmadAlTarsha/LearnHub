import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  CssBaseline,
} from "@mui/material";


import SimpleSnackbar from "../components/Snackbar/index";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    user_type_id: "1",
    phone: "",
    birth_date: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.email &&
      formData.name &&
      formData.password &&
      formData.repassword &&
      formData.phone &&
      formData.birth_date
    ) {
      if (formData.password !== formData.repassword) {
        setSnackBar({
          text:"Passwords do not match",
          status:"error"
        });

        setOpenSnackbar(true)
      } else {
        try {
          const result = await axios.post(
            "http://localhost:5001/users/signup",
            {
              full_name: formData.name,
              password: formData.password,
              email: formData.email,
              user_phone: formData.phone,
              birth_date: formData.birth_date,
              user_type_id: formData.user_type_id,
            }
          );
          console.log(result);

          setSnackBar({
            text:"signup successfully",
            status:"success"
          });
  
          setOpenSnackbar(true)
        } catch (error) {

          setSnackBar({
            text:error.response.data
            .message,
            status:"error"
          });
  
          setOpenSnackbar(true)
          console.error("Error during signup:", error);
        }
      }
    } else {
      setSnackBar({
        text:"missing data ",
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
            Join Our Learning Platform
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Sign up today to access a variety of programming courses for all
            levels. Learn from experts and enhance your skills.
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
                    Register
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
                          id="name"
                          label="Name"
                          name="name"
                          autoComplete="name"
                          autoFocus
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="repassword"
                          label="Re-enter Password"
                          type="password"
                          id="repassword"
                          autoComplete="current-password"
                          value={formData.repassword}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          type="number"
                          id="phone"
                          autoComplete="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="birth_date"
                          label="Birthday"
                          type="date"
                          id="birth_date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.birth_date}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="role-label">Role</InputLabel>
                          <Select
                            labelId="role-label"
                            id="role"
                            name="user_type_id"
                            value={formData.user_type_id}
                            onChange={handleChange}
                            label="Role"
                          >
                            <MenuItem value="1">User</MenuItem>
                            <MenuItem value="2">Teacher</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Typography variant="body2">
                          Already have an account?{" "}
                          <Link to="/login">Sign in</Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Why Register?
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                By registering on our platform, you'll gain access to a wide
                range of programming courses designed for all skill levels.
                Whether you're a beginner looking to start your coding journey
                or an experienced developer seeking to enhance your skills, we
                have the right course for you.
              </Typography>
              <Typography variant="body1">
                Our expert instructors and comprehensive curriculum ensure that
                you receive the best learning experience possible.
              </Typography>
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

export default Signup;

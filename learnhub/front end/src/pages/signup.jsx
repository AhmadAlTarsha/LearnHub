import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";

function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    repassword: "",
    role: "user",
    phone: "",
    birthday: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelSignup = async (data) => {
    const result = await axios.post("http://localhost:5001/users/signup", {
      full_name: data.name,
      password: data.password,
      email: data.email,
      user_phone: data.phone,
      birth_date: data.birthday,
      user_type_id: 1,
    });

    console.log(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.email &&
      formData.name &&
      formData.password &&
      formData.repassword &&
      formData.phone &&
      formData.birthday
    ) {
      if (formData.password !== formData.repassword) {
        console.log("Passwords do not match");
      } else {
        console.log("All good");
        handelSignup(formData);
      }
    } else {
      console.log("Missing data");
    }
  };

  return (
    <div>
      <Box>
        <Container sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Join Our Learning Platform
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Sign up today to access a variety of programming courses for all
            levels. Learn from experts and enhance your skills.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ mt: -8, mb: 4 }}>
        <Grid container spacing={4}>
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
                      <Grid item xs={12}>
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
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          id="phone"
                          autoComplete="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="birthday"
                          label="Birthday (YYYY-MM-DD)"
                          id="birthday"
                          autoComplete="birthday"
                          value={formData.birthday}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                          <FormLabel component="legend">Role</FormLabel>
                          <RadioGroup
                            aria-label="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="user"
                              control={<Radio />}
                              label="User"
                            />
                            <FormControlLabel
                              value="teacher"
                              control={<Radio />}
                              label="Teacher"
                            />
                          </RadioGroup>
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
    </div>
  );
}

export default Signup;

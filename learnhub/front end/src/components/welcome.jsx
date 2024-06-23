import React from "react";

import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const WelcomePage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Our Course Platform
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We provide a variety of programming courses for all levels. Learn from
          experts, and enhance your skills to advance your career.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://modo3.com/thumbs/fit630x300/93604/1480889132/%D8%AA%D8%B9%D9%84%D9%85_%D9%84%D8%BA%D8%A9_%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9.jpg"
              alt="Programming"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Learn Programming
              </Typography>
              <Typography variant="body2">
                Access a wide range of programming courses and start coding your
                own applications today.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7_5EaAnJmpHtJAyfHz2AwPxK4Lxo5QPctw&s"
              alt="Expert Instructors"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Expert Instructors
              </Typography>
              <Typography variant="body2">
                Learn from industry experts with years of experience and gain
                valuable insights and skills.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://images.ctfassets.net/wp1lcwdav1p1/bQk0KdcmdHZGsg4feMPdz/f2cfcffece129f1b14687b367821db01/GettyImages-1127726432.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive"
              alt="Career Advancement"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Career Advancement
              </Typography>
              <Typography variant="body2">
                Enhance your career prospects by learning the latest programming
                languages and technologies.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;

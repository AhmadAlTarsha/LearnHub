import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCourses } from "../../service/Redux/courses";
import { Card, CardContent, CardMedia, Typography, Box, Grid, Rating, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { styled } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';

const StyledCard = styled(Card)`
  max-width: 345px;
  margin: 20px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Courses = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = useSelector((state) =>
    state.courses?.allCourses?.filter((item) => item.active === 1)
  );

  useEffect(() => {
    dispatch(GetAllCourses());
  }, [dispatch]);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
  };

  const handleClose = () => {
    setSelectedCourse(null);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, mt: 5 }}>
      <Grid container spacing={3}>
        {courses?.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <StyledCard onClick={() => handleCardClick(course)}>
              <CardMedia
                component="img"
                alt="Course Image"
                height="140"
                image="https://pbs.twimg.com/profile_images/1688202871647399936/Oc697Gu4_400x400.jpg" 
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teacher: {course.teacher}
                </Typography>
                <Rating
                  name="read-only"
                  value={Math.floor(Math.random() * 5) + 1} 
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      {selectedCourse && (
        <Dialog open={selectedCourse !== null} onClose={handleClose}>
          <DialogTitle>{selectedCourse.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedCourse.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Courses;

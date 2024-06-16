import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import CourseList from "./allcourses";
import CenteredCircularProgress from "../../components/Loader";

import {  GetCoursesById} from "../../service/Redux/courses";
const Course = () => {
  const itemName = "course";

  const dispatch = useDispatch();

  const CourseSelector = useSelector((state) => {
    return state.courses;
  });
// const courses=CourseSelector.courses
 console.log(CourseSelector);

  // !-----------------------------------------------------------side effect
  useEffect(() => {
    dispatch(GetCoursesById(localStorage.getItem("id")));
  }, [dispatch]);
  return (
    <>
      {!CourseSelector.isLoading ? (
        <Container>
          <Typography variant="h4" gutterBottom>
            Teacher Courses
          </Typography>
          {/* <CourseList
            courses={courses}
            branchUpdate={CourseSelector.courseUpdate}
            BranchSelector={CourseSelector}
            itemName={itemName}
          /> */}
        </Container>
      ) : (
        <CenteredCircularProgress />
      )}
    </>
  );
};

export default Course;

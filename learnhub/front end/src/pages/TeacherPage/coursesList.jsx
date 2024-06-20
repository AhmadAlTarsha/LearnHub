import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import CourseList from "./allTeacherCourses";
import CenteredCircularProgress from "../../components/Loader";

import {  GetCoursesById} from "../../service/Redux/courses";
const Course = () => {
  const itemName = "course";

  const dispatch = useDispatch();

  const CourseSelector = useSelector((state) => {
    return state.courses;
  });
const courses=CourseSelector?.courses?.filter((item)=>{
  return item.active===1
})
console.log(courses);
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
          <CourseList
          teacherName={localStorage.getItem("name")}
          user_id={localStorage.getItem("id")}
            courses={courses}
            courseUpdateUpdate={CourseSelector.courseUpdate}
            CourseSelector={CourseSelector}
            itemName={itemName}
          />
        </Container>
      ) : (
        <CenteredCircularProgress />
      )}
    </>
  );
};

export default Course;

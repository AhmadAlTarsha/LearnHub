import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetAllCourses } from "../service/Redux/courses";










const Allcourses = () => {

    const dispatch=useDispatch()
    const CoursesSelector = useSelector((state) => {
        return state.course;
      });
    
      console.log(CoursesSelector);


    useEffect(() => {
        dispatch(GetAllCourses());
      }, [dispatch]);

  return <div>allcourses</div>;
};

export default Allcourses;

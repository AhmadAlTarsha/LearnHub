import axios from "axios";

const url = "http://localhost:5001/";

export const getAllCourses = async () => {
    try {
      const result = await axios.get(`${url}courses`);
  
      if (!result?.data?.error) {
        return result?.data?.course;
      }
    } catch (err) {
      console.error("ERROR ====> ", err);
      throw err.response.data.message;
    }
  };


  export const deleteCourse = async (payload) => {
    try {
      const result = await axios.delete(`${url}courses/${payload.branchId}`);
  
      if (!result.data?.error) {
        const course = await getAllCourses();
  
        return {
          message: result.data?.message,
          course: course,
        };
      }
    } catch (err) {
      console.error("ERROR ====> ", err.response.data.message);
      throw err.response.data.message;
    }
  };
  
  export const addCourse = async (payload) => {
    console.log(payload);
    try {
      const result = await axios.post(`${url}branch`, {
        name: payload.name,
        phone: payload.phone,
        street_name: payload.street_name,
      });
  
      if (!result.data?.error) {
        const course = await getAllCourses();
  
        return {
          message: result.data?.message,
          course: course,
        };
      }
    } catch (err) {
      console.log("ERROR ====> ", err.response.data.message);
      throw err.response.data.message;
    }
  };
  export const editCourse= async (payload) => {
    // console.log(payload.branchId);
  
    try {
      const result = await axios.put(`${url}course/${payload.courseId}`, {
        name: payload.content.name.trim(),
        description: payload.description.trim(),
      
      });
  
      if (!result.data?.error) {
        const course = await getAllCourses();
  
        return {
          message: result.data?.message,
          course: course,
        };
      }
    } catch (err) {
      console.log("ERROR  from editing====> ", err);
  
      throw err.response.data.message;
    }
  };
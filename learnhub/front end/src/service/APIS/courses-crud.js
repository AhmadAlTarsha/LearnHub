import axios from "axios";

const url = "http://localhost:5001/";
const token = JSON.parse(localStorage.getItem("token")) ?? {};

export const getAllCourses = async () => {
  try {
    const result = await axios.get(`${url}course`);

    if (!result?.data?.error) {
      return result?.data?.result;
    }
  } catch (err) {
    console.error(" ====> ", err);
    throw err.response.data.message;
  }
};
export const getCoursesById = async (courseId) => {
  try {
    const result = await axios.get(`${url}course/teacher/${courseId}`);

    if (!result?.data?.error) {
      return result?.data?.result;
    }
  } catch (err) {
    console.error(" ====> ", err);
    throw err.response.data.message;
  }
};

export const deleteCourse = async (payload) => {
  console.log(payload);
  try {
    const result = await axios.delete(`${url}course/${payload.courseId}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!result.data?.error) {
      const course = await getCoursesById(localStorage.getItem("id"));

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
    const result = await axios.post(
      `${url}course`,
      {
        name: payload.name,
        description: payload.description,
        user_id: payload.user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!result.data?.error) {
      const course = await getCoursesById(payload.user_id);

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
export const editCourse = async (payload) => {
 

  try {
    const result = await axios.put(`${url}course/${payload.courseId}`,payload.content,{
      headers: {
        Authorization: `Bearer ${token?.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!result.data?.error) {
      const course = await getCoursesById(localStorage.getItem("id"));

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

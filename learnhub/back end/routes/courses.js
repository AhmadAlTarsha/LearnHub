const express = require("express");
const CourseRouter = express.Router();
const {
  addNewCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  editCourse,
  getCourseByUserId,
} = require("../controllers/courses");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

CourseRouter.post("/",authentication,authorization("manage_course"), addNewCourse);
CourseRouter.get("/", getAllCourses);
CourseRouter.get("/teacher/:id", getCourseByUserId);
CourseRouter.get("/:id", getCourseById);
CourseRouter.put("/:id",authentication,authorization("manage_course"), editCourse);
CourseRouter.delete("/:id",authentication,authorization("manage_course"), deleteCourse);

module.exports = CourseRouter;

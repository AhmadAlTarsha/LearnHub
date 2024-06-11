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
// const { authentication } = require("../middlewares/authintication");
// const { authorization } = require("../middlewares/authurization");

CourseRouter.post("/", addNewCourse);
CourseRouter.get("/", getAllCourses);
CourseRouter.get("/teacher", getCourseByUserId);
CourseRouter.get("/:id", getCourseById);
CourseRouter.put("/:id", editCourse);
CourseRouter.delete("/:id", deleteCourse);

module.exports = CourseRouter;

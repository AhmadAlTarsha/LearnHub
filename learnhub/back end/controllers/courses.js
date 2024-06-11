const Course = require("../models/course");
const User = require("../models/user");

const { throwError } = require("../middleware/throwError");
const { Op } = require("sequelize");

exports.addNewCourse = async (req, res, next) => {
  const { name, description, user_id } = req.body;

  try {
    const course = await Course.create({
      name,
      description,
      user_id,
    });

    if (course.uniqno) {
      return res.status(200).json({
        error: false,
        message: "course Created Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const result = await Course.findAll({
      where: { active: 1 },
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
      ],
    });

    if (result[0]?._options.raw) {
      const allCourses = result.map((course) => {
        return {
          id: course.id,
          name: course.name,
          description: course.description,
          active: course.active,
          teacher: course.user.full_name,
          created_at: course.created_at,
        };
      });
      return res.status(200).json({
        error: false,
        branch: allCourses,
        // test:result
      });
    } else if (result.length === 0) {
      return res.status(201).json({
        error: false,
        message: "no courses added yet",
        courses: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

exports.getCourseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Course.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        error: true,
        message: "course not found",
      });
    }
    console.log(result);
    // const teacher = result.user.full_name

    return res.status(200).json({
      error: false,
      course: {
        id: result.id,
        name: result.name,
        description: result.description,
        active: result.active,
        teacher: result.user.full_name,
        created_at: result.created_at,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

exports.getCourseByUserId = async (req, res, next) => {
  const { user_id } = req.body;
console.log(user_id);
  try {
    const result = await Course.findAll(
       {where: {user_id:user_id }}
      // {
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["full_name"],
      //     },
      //   ],
      // }
    );

    // if (!result) {
    //   return res.status(404).json({
    //     error: true,
    //     message: "course not found",
    //   });
    // }
    console.log("==================================",result);
    // const teacher = result.user.full_name

    return res.status(200).json({
      error: false,
      result: result,
      // course: {
      //   id: result.id,
      //   name: result.name,
      //   description: result.description,
      //   active: result.active,
      //   teacher: result.user.full_name,
      //   created_at: result.created_at,
      // },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};
exports.editCourse = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, street_name } = req.body;

  try {
    const existingBranch = await Branch.findOne({
      where: {
        name,
        active: 1,
        id: { [Op.ne]: id },
      },
    });
    if (existingBranch) {
      return res.status(400).json({
        error: true,
        message: "branch name in use",
      });
    }
    const result = await Branch.update(
      { name, phone, street_name },
      { where: { id } }
    );
    if (result.sqlMessage) {
      return res.status(200).json({
        error: false,
        message: "Account info in use",
      });
    }

    if (result[0] === 0) {
      return res.status(404).json({
        error: true,
        message: "branch not found or no changes made",
      });
    }

    return res.status(200).json({
      error: false,
      message: "branch updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Branch.update(
      {
        active: 0,
      },
      { where: { id: id } }
    );
    if (result) {
      return res.status(200).json({
        error: false,
        message: "branch deleted successfully",
      });
    }
    console.log(result);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err,
    });
  }
};

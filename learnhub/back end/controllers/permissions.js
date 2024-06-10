const Permissions = require("../models/permission");



exports.addNewPermissions = async (req, res, next) => {
  Permissions.bulkCreate([
    { name: "view_courses" },
    { name: "manage_course" },

    { name: "manage_users" },
  ])
    .then((result) => {
      return res.status(200).json({
        error: false,
        message: "permissions found",
        allPermissions: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: "Error Getting permissions",
        error: err,
      });
    });


};

exports.getAllPermissions = async (req, res, next) => {
  try {
    const result = await Permissions.findAll();

    if (result[0]?._options?.raw) {
      return res.status(200).json({
        error: false,
        Permissions: "Permissions",
        Permissions: result,
      });
    } else if (result.length == 0) {
      return res.status(404).json({
        error: false,
        message: "no Permissions inserted yet",
      });
    }

    throw new Error("Ops!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Error Getting Region",
    });
  }
};

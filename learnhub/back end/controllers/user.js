const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserType = require("../models/user_type");

const TypePermission = require("../models/type_permission");
const Permission = require("../models/permission");

const path = require("path");

// const { mwError } = require("../middleware/throwError");
const fs = require("fs");
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
//---------------------------------------------------- signup function to signup new user

exports.signup = async (req, res, next) => {
  const {
    full_name,
    email,

    password,

    birth_date,

    user_phone,

    user_type_id,
  } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const [result] = await User.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: {
        email: email.toLowerCase(),
        full_name,
        password: encryptedPassword,

        birth_date,

        user_phone,

        user_type_id,
      },
    });

    if (!result._options.isNewRecord) {
      clearImage(image);

      return res.status(401).json({
        error: true,
        message: "User Already Registered",
      });
    } else if (result._options.isNewRecord) {
      return res.status(201).json({
        error: false,
        user: result[0],
        message: "Account Created Successfully",
      });
    }
  } catch (error) {
    clearImage(image);
    if (error.message) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
    if (!error.statusCode) {
      err.statusCode = 500;
      next(error);
    }
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id, {
      include: [
        {
          model: UserType,
          attributes: ["type"],
          include: [
            {
              model: TypePermission,
              attributes: ["permission_id"],
              include: [{ model: Permission, attributes: ["name"] }],
            },
          ],
        },
       
      ],
      attributes: { exclude: ["user_type_id"] },
    });
    res.status(200).json({
      error: false,
      user: result,
    });
    return mwError("Error");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.login = async (req, res, next) => {
  let token = "";
  let user = {};

  let { email, password } = req.body;

  try {
    const result = await User.findOne({
      where: { email: email.toLowerCase() },
      include: {
        model: UserType,
        attributes: ["type"],
        include: [
          {
            model: TypePermission,
            attributes: ["permission_id"],
            include: [{ model: Permission, attributes: ["name"] }],
          },
        ],
      },
    });

    if (result?.dataValues?.id) {
      const isValidPassword = await bcrypt.compare(
        password,
        result?.dataValues?.password
      );
      if (!isValidPassword) {
        return mwErrorError(404, "Email or Password is incorrect");
      }

      user = result?.dataValues;
      const TypePermission = result.user_type.type_permissions.map((data) => {
        return data.Permission.name;
      });
      user.Permission = TypePermission;

      const payLoad = {
        user,
      };
      const options = {
        expiresIn: "7d",
      };

      token = jwt.sign(payLoad, process.env.SECRET, options);

      return res.status(200).json({
        error: false,
        message: "Login Successfully",
        id: user.id,
        token,
      });
    }
    return mwError(404, "Error !!");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.updateUserInfoById = async (req, res, next) => {
  try {
    const {
      full_name,
      
     
   
      birth_date,
    } = req.body;
    const { id } = req.params;

    const [result] = await User.update(
      {
        full_name,
       
        birth_date,
      },
      { where: { id } }
    );

    if (result.sqlMessage) {
      return res.status(200).json({
        error: false,
        message: "Account info in use",
      });
    }
    if (result) {
      return res.status(200).json({
        error: false,
        message: "Account updated successfully",
      });
    }

    throw new Error("server error or invalid data");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message,
    });
    next(err);
  }
};

exports.updateUserImage = async (req, res, next) => {
  let image;
  try {
    if (req.file) {
      image = req.file.path.replace("\\", "/");
    }
    const { id } = req.params;
    const {
      dataValues: { civil_identity_image },
    } = await User.findByPk(id, {
      attributes: ["civil_identity_image"],
    });

    const [result] = await User.update(
      {
        civil_identity_image: image,
      },
      { where: { id } }
    );

    if (result) {
      clearImage(civil_identity_image);
      return res.status(200).json({
        error: false,
        message: "image updated successfully",
      });
    }
  } catch (err) {
    clearImage(image);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


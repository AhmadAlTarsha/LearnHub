const express = require("express");
const {
  signup,
  login,
  getUserById,

  updateUserInfoById,
  updateUserImage,
} = require("../controllers/users");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

const usersRouter = express.Router();

usersRouter.post("/signup", signup);
usersRouter.get("/:id", getUserById);

usersRouter.post("/login", login);
usersRouter.put("/update/info/:id", updateUserInfoById);
usersRouter.put("/update/image/:id", updateUserImage);

// usersRouter.put("/update/spare-phone/:id", updateUserSparePhone);

module.exports = usersRouter;

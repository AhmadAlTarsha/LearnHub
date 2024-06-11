// require express

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = 5001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, new Date().getMilliseconds().toString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    console.log("error");
    cb(null, false);
  }
};
const uplode = multer({ storage: storage });
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

//=======================Models=====================
const User = require("./models/user");
const Course = require("./models/course");


//=======================Routes======================
const TypePermission = require("./routes/type_permission");
const PermissionRouter = require("./routes/permissions");
const typeRouter = require("./routes/user_type");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");


//-----------------------------------------------
app.use("/type_permission", TypePermission);
app.use("/permissions", PermissionRouter);
app.use("/types", typeRouter);
app.use("/users", usersRouter);
app.use("/course", courseRouter);

app.use("*", (req, res) =>
  res.status(404).json({
    error: true,
    message: "NO content at this path",
  })
);
//{ force: true }
sequelize
  .sync()

  .then((res) => {
    app.listen(PORT, () => {
      // will log to the command line when the server starts
      console.log(`${PORT}`);
    });
  });

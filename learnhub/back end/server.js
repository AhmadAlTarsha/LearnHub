// require express

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");

const cors = require("cors");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = 5001;



app.use("*", (req, res) =>
    res.status(404).json({
      error: true,
      message: "NO content at this path",
    })
  );
  //{ force: true  }
  sequelize
    .sync( )
   
    .then((res) => {
      app.listen(PORT, () => {
        // will log to the command line when the server starts
        console.log(`${PORT}`);
      });
    });
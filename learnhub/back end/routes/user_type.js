const express = require("express");
const { addNewType,getAllUserType } = require("../controllers/user-type");
const typeRouter = express.Router();

typeRouter.post('/', addNewType)
typeRouter.get('/', getAllUserType)

module.exports = typeRouter;
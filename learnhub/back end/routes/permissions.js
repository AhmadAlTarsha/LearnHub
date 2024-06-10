const express = require("express");
const { addNewPermissions,getAllPermissions} = require("../controllers/Permissions");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const PermissionRouter = express.Router();

PermissionRouter.post('/',addNewPermissions)
PermissionRouter.get('/',getAllPermissions)


module.exports = PermissionRouter;
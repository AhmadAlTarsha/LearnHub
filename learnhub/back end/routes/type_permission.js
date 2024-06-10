const express = require("express");
const { addNewTypePermission,getAllTypePermissions,getAllPermissionsOnUserType} = require("../controllers/type-permissions");
const TypePermissionRouter = express.Router();

TypePermissionRouter.post('/',addNewTypePermission)
TypePermissionRouter.get('/',getAllTypePermissions)
TypePermissionRouter.get('/type_id/:type_id',getAllPermissionsOnUserType)


module.exports = TypePermissionRouter;
const Type = require("../models/user_type");
const Permission = require("../models/permission");
const TypePermission = require("../models/type_permission");
// const {Error}= require("../middleware/throwError")
exports.addNewTypePermission = async (req, res, next) => {
  const { type_id, permission_id } = req.body;

  try {
    const result = await TypePermission.create({
      type_id,
      permission_id,
    });

    if (result?._options?.isNewRecord) {
      return res.status(201).json({
        error: false,
        message: "TypePermission Added successfully",
      });
    }

   Error("Ops!");
  } catch (err) {
    next(err)
  }
};

exports.getAllTypePermissions = async (req, res, next) => {
  try {
    const result = await TypePermission.findAll({
      include: [
        { model: Type,  attributes: ["type"] },
        { model: Permission,  attributes: ["name"] },
        
      ],
    });
console.log(result);
   
    if (result[0]?._options?.raw) {
      return res.status(200).json({
        error: false,
        message: "status",
        Type_Permission: result,
      });
    } else if (result.length == 0) {
      return res.status(404).json({
        error: false,
        message: "no Type_PermissionRouter inserted yet",
      });
    }
 Error("error!");
  } catch (err) {
   next(err)
  }
};
exports.getAllPermissionsOnUserType = async (req, res, next) => {
  const{type_id}=req.params
  try {
    const result = await TypePermission.findAll({
      where: { type_id: type_id },
      include: [{ model: Type,attributes: ["type"] }, { model: Permission  ,attributes: ["name"]},],
      attributes: []
    });
const userPermission= result.map((data)=>{
 return data.Permission.name
});
console.log(result);
 
    if (result[0]?._options?.raw) {
      return res.status(200).json({
        error: false,
        message: "status",
        userPermission:{
          userType:result[0].user_type.type,
          Permission: userPermission,

        }
        
       
      });
    } else if (result.length == 0) {
      return res.status(404).json({
        error: false,
        message: "no Type_Permission inserted yet",
      });
    }

     Error("Ops!");
  } catch (err) {
   next(err)
  }
};
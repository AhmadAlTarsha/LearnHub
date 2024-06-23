const Type = require("../models/user_type");




exports.addNewType = async (req, res, next) => {
 

  
     Type.bulkCreate(
      [
          { type: "user"},
          { type: "teacher"},
          { type: "manager"},
         
        
        ]
    ) .then((result) => {
      return res.status(200).json({
          error: false,
          message: "type found",
          allPermissions: result,
        });
    })
    .catch((err) => {
      return res.status(500).json({
          error: true,
          message: "Error Getting permissions",
          error:err
        });
    
    });


  
};

exports.getAllUserType = async (req, res, next) => {
  try {
    const result = await Type.findAll();
   

    if (result[0]?._options?.raw) {
      return res.status(201).json({
        error: false,
        message: "Type",
        Type: result,
      });
    } else if (result.length == 0) {
      return res.status(201).json({
        error: false,
        message: "no Type inserted yet",
      });
    }

     Error("error!");
  } catch (err) {
   next(err)
  }
};
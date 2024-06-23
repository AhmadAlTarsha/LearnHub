
exports.authorization = (string) => {
  return (req, res, next) => {



    if (!req.token.user.Permission.includes(string)) {
    
      return res.status(403).json({
        success: false,
        message: `Unauthorized !`,
      });
    }
    next();
  };
};

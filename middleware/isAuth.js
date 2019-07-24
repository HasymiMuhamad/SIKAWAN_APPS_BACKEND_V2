var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAuthentication = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded){
      if (err) {
        res.status(403).json({
          success:'false',
          message:'Failed to authenticate token'});
      } else {
        req.fullname = decoded.fullname;
        req.school = decoded.school;
        req.kelas = decoded.kelas;
        req.doe = decoded.doe;
        req.id = decoded._id;
        req.role = decoded.role;
        req.subjects = decoded.subjects;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message:'Unauthorized. No token provided.'});
  }
};

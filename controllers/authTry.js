const schoolModel = require('../model/school'),
  studentModel = require('../model/student'),
  teacherModel = require('../model/teacher'),
  doeModel = require('../model/doe'),
  adminModel = require('../model/admin'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authentication = function (req, res, next) {
  Promise.all([
    schoolModel.findOne({ email: req.body.username }),
    studentModel.findOne({ nisn: req.body.username }),
    // studentModel.findOne({ email: req.body.username }),
    teacherModel.findOne({ nip: req.body.username }),
    // teacherModel.findOne({ email: req.body.username }),
    doeModel.findOne({ email: req.body.username }),
    adminModel.findOne({ username: req.body.username })
  ])
    .then(result => {
      // console.log(result)
      result = result[0] || result[1] || result[2] || result[3] || result[4];
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Username not found'
        });
      } 
      // else if (!result.isVerified){
      //   return res.status(403).json({
      //     success: false,
      //     message: 'Your account has not been verified. Please verify your account'
      //   });
      // }

      var payload = {};
      payload.image = result.image ? result.image : null;
      payload.nisn = result.nisn;
      payload.nip = result.nip;
      payload.username = result.username;
      payload.fullname = result.fullname;
      payload.doe = result.doe;
      payload.kelas = result.kelas;
      payload.email = result.email;
      payload.school = result.school;
      payload.teaching = result.teaching;
      payload.role = result.role;
      payload._id = result._id;
      payload.subjects = result.subjects;
      bcrypt.compare(req.body.password, result.password)
        .then(data => {
          if (data) {
            var token = jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256', expiresIn: '1w'});
            res.status(200).json({
              success: true,
              message: 'Authenticated',
              data: {
                fullname : payload.fullname,
                image: payload.image,
                email : payload.email,
                role: payload.role,
                token: token
              }
            });
          } else {
            res.status(401).json({
              success: false,
              message: 'username and password don\'t match'
            });
          }
        })
        .catch(next);
    })
    .catch(next);
};


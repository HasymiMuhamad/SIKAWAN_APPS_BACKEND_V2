const schoolModel = require('../model/school'),
  studentModel = require('../model/student'),
  teacherModel = require('../model/teacher'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

require('dotenv').config();

exports.authentication = function (req, res, next) {
  Promise.all([
    schoolModel.findOne({ 'account.email': req.body.username },{},{autopopulate:false}),
    studentModel.findOne({ 'academicDetails.nisn': req.body.username },{},{autopopulate:false}),
    teacherModel.findOne({ 'academicDetails.nip': req.body.username },{},{autopopulate:false})
  ])
    .then(result => {
      result = result[0] || result[1] || result[2];
      var payload = {};
      payload.personalDetails = result.personalDetails;
      payload.generalDetails = result.generalDetails;
      payload.role = result.role;
      payload._id = result._id;
      bcrypt.compare(req.body.password, result.account.password)
        .then(data => {
          if (data) {
            var token = jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256' });
            res.status(200).json({
              success: true,
              message: 'Authenticated',
              data:{
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
        .catch(err=> {
          res.status(400).json({
            success: false,
            message: err.message
          });
        });
    })
    .catch(next);
};


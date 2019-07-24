const adminModel = require('../model/admin'),
  bcrypt = require('bcrypt'),
  saltRounds = 10;


exports.registerAdmin = (req, res, next) => {
  var admin = new adminModel({
    username: req.body.username,
    password: req.body.password
  });
  bcrypt.hash(req.body.password, saltRounds)
    .then(hash => {
      admin.password = hash;
      admin.save()
        .then((result) => {
          res.status(201).json({
            success : true,
            message: 'Admin Created',
            data: result
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.profileAdmin = (req, res, next) => {
  adminModel.findById(req.id)
    .select('-id')
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'Profile',
        data: result
      });
    })
    .catch(next);
};

exports.allAdmin = (req, res, next) => {
  adminModel.find()
    .select('-password')
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'All Admin',
        data: result
      });
    })
    .catch(next);
};

exports.deleteAdmin = (req,res, next) => {
  adminModel.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({
        success: true,
        message: 'Admin Deleted Successfully',
      });
    })
    .catch(next);
};








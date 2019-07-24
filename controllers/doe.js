const doeModel = require('../model/doe'),
  bcrypt = require('bcrypt'),
  crypto = require('crypto'),
  generator = require('generate-password'),
  Token = require('../model/token'),
  saltRounds = 10;

require('dotenv').config();


exports.registerDOE = (req, res, next) => {
  var generatePassword = generator.generate({
    length: 6,
    numbers: true
  });
  var doe = new doeModel({
    fullname: req.body.fullname,
    email: req.body.email,
    password: generatePassword
  });
  bcrypt.hash(generatePassword, saltRounds)
    .then(hash => {
      doe.password = hash;
      doe.save()
        .then((result) => {
          if (result) {
            req.username = doe.email,
            req.password = generatePassword;
          }
          var token = new Token({
            doe: doe._id,
            token: crypto.randomBytes(16).toString('hex')
          });
          token.save((err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              });
            } else {
              req.token = token.token;
              next();
            }
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.profileDoe = (req, res, next) => {
  doeModel.find({})
    .select('-id -password -complaints -school')
    .exec((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        success: true,
        message: 'Departement Of Education',
        data: data
      });
    });
};

exports.update = (req, res, next) => {
  let newProfile = req.body;
  if (req.body.password) {
    res.status(401).json({
      success: false,
      message: 'You are not authorized to change password'
    });
  }
  doeModel.findByIdAndUpdate(req.params.id, {
    $set: newProfile
  }, { new: true })
    .then((updated) => {
      // console.log(updated);
      res.status(200).json({
        success: true,
        message: 'Sucessfully Updated The Departement Of Education Profile',
        data: updated
      });
    })
    .catch(next);
};

exports.deleteDOE = (req, res, next) => {
  doeModel.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'DOE Deleted',
      });
    })
    .catch(next);
};








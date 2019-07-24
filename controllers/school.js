const schoolModel = require('../model/school'),
  complaintModel = require('../model/complaint'),
  doeModel = require('../model/doe'),
  Token = require('../model/token'),
  generator = require('generate-password'),
  crypto = require('crypto'),
  bcrypt = require('bcrypt'),
  saltRounds = 10,
  generatePassword = require('generate-password');

exports.registerSchool = (req, res, next) => {
  var generatePassword = generator.generate({
    length: 6,
    numbers: true
  });
  var school = new schoolModel({
    fullname: req.body.fullname,
    npsn: req.body.npsn ? req.body.npsn: null ,
    password: generatePassword,
    email: req.body.email ? req.body.email : null,
    address: req.body.address ? req.body.address : null,
    doe: req.body.doe
  });
  bcrypt.hash(generatePassword, saltRounds)
    .then(hash => {
      school.password = hash;
      school.save()
        .then((result) => {
          if (result) {
            req.username = school.email,
            req.password = generatePassword;
          }
          doeModel.findByIdAndUpdate(req.body.id, { $push: { school: school._id } }, { new: true })
            .select('fullname');
          var token = new Token({
            school: school._id,
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


//find all schools
exports.schools = (req, res, next) => {
  schoolModel.find({})
    .populate('doe', 'fullname')
    .exec((err, data) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'no schools registered yet!'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Schools data',
        data: data
      });
    });
};

//find one school
exports.oneSchool = (req, res, next) => {
  schoolModel.findById(req.query.id)
    .populate('school', '-id -password')
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'School Data',
        data: result
      });
    })
    .catch(next);
};

exports.updateProfileSchool = (req, res, next) => {
  schoolModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'School Data Updated',
        data: result
      });
    })
    .catch(next);
};

exports.deleteSchool = (req, res, next) => {
  schoolModel.findByIdAndRemove(req.params.id)
    .then(() => {
      Promise.all([
        doeModel.findByIdAndUpdate(req.params.id, { $pull: { school: req.params.id } }, { new: true }),
        complaintModel.findByIdAndUpdate(req.params.id, { $pull: { school: req.params.id } }, { new: true })
      ])
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'School Deleted',
          });
        })
        .catch(next);
    })
    .catch(next);
};

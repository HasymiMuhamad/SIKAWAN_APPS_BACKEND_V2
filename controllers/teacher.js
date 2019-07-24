const bcrypt = require('bcrypt'),
  teacherModel = require('../model/teacher'),
  schoolModel = require('../model/school'),
  Token = require('../model/token'),
  generator = require('generate-password'),
  crypto = require('crypto'),
  saltRounds = 10;


exports.registerTeacher = (req, res, next) => {
  var generatePassword = generator.generate({
    length: 6,
    numbers: true
  });

  // register techer
  let teacher = new teacherModel({
    fullname: req.body.fullname ? req.body.fullname : null,
    pob: req.body.pob ? req.body.pob : null,
    dob: req.body.dob ? req.body.dob : null,
    address: req.body.address ? req.body.address : null,
    religion: req.body.religion ? req.body.religion : null,
    gender: req.body.gender ? req.body.gender : null,
    subjects: req.body.subjects ? req.body.subjects : null,
    nip: req.body.nip,
    school: req.id, // req.id from middleware isAuth
    email: req.body.email,
    password: req.body.password ? req.body.password : generatePassword,
    image: req.file ? req.file.url : null
  });

  var hash = bcrypt.hashSync(generatePassword, saltRounds);
  teacher.password = hash;
  teacher.save()
    .then((result) => {
      if (result) {
        req.username = teacher.nip,
        req.password = generatePassword;
      }
      schoolModel.findByIdAndUpdate(req.id, { $push: { teachers: teacher._id } }, { new: true }, err => {
        if (err) return next(err);
      });

      var token = new Token({
        teacher: teacher._id,
        token: crypto.randomBytes(16).toString('hex')
      });
      token.save(err => {
        if (err) {
          return next(err);
        } else {
          req.token = token.token;
          next();
        }
      });
    })
    .catch(next);
};


// teacher get his profile
exports.Profile = (req, res, next) => {
  teacherModel.findById(req.id)
    .populate('subjects', 'name')
    .populate('school', 'fullname')
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'Your Profile',
        data: data
      });
    })
    .catch(next);
};

// show all teacher
exports.find = (req, res, next) => {
  teacherModel.find()
    .populate('subjects', 'name')
    .populate('school', 'fullname')
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'all teacher',
        data: data
      });
    })
    .catch(next);
};

// find one teacher
exports.findOne = (req, res, next) => {
  teacherModel.findById(req.params.id, '-password')
    .populate('subjects', 'name')
    .then(data => {
      res.status(201).json({
        success: true,
        message: 'teacher found',
        data: data
      });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  let newProfile = req.body;
  if (req.file) {
    newProfile.image = req.file.url;
  }
  teacherModel.findByIdAndUpdates(req.params.id, {
    $set: newProfile
  }, { new: true })
    .then((updated) => {
      // console.log(updated);
      res.status(200).json({
        success: true,
        message: 'Sucessfully Updated The Student Profile',
        data: updated
      });
    })
    .catch(next);
};


exports.delete = (req, res, next) => {
  teacherModel.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'Data is deleted successfully'
      });
    }
  });
};

// classrooms taught by this teacher
exports.classroom = (req, res, next) => {
  teacherModel.findById(req.id)
    .populate({
      path: 'teaching',
      select: 'fullname'
    })
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          success: false,
          message: 'no classroom to teach yet'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'list of classrooms',
          data: data.teaching
        });
      }
    })
    .catch(next);
};


exports.delete = (req, res, next) => {
  teacherModel.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'teacher data deleted'
      });
    })
    .catch(next);
};




const studentModel = require('../model/student'),
  // complaintModel = require('../model/complaint'),
  classroomModel = require('../model/classroom'),
  schoolModel = require('../model/school'),
  // attendanceModel = require('../model/attendance'),
  scoreModel = require('../model/score'),
  summaryModel = require('../model/summary'),
  doeModel = require('../model/doe'),
  Token = require('../model/token'),
  generator = require('generate-password'),
  crypto = require('crypto'),
  bcrypt = require('bcrypt'),
  saltRounds = 10;

require('dotenv').config();

// get student profile for mobile
exports.profile = (req, res, next) => {
  studentModel.findById(req.id, '-password')
    .populate({
      path: 'score.details',
      select: 'category point subjects createdAt',
      populate: { path: 'subjects', select: 'name' }
    })
    .populate('attendance')
    .populate('complaint', 'complaint image responseDoe responseSchool status')
    .populate('kelas', 'fullname')
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          success: true,
          message: 'student not found'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'profile found',
          data: data
        });
      }
    })
    .catch(next);
};

// register student - works, final
exports.registerStudent = (req, res, next) => {
  let generatePassword = generator.generate({
    length: 6,
    numbers: true
  });
  let student = new studentModel({
    fullname: req.body.fullname ? req.body.fullname : null,
    pob: req.body.pob ? req.body.pob : null,
    dob: req.body.dob ? req.body.dob : null,
    parent: req.body.parent ? req.body.parent : null,
    address: req.body.address ? req.body.address : null,
    religion: req.body.religion ? req.body.religion : null,
    gender: req.body.gender ? req.body.gender : null,
    nisn: req.body.nisn,
    school: req.id, // req.id from middleware isAuth
    kelas: req.body.kelas,
    email: req.body.email,
    image: req.file ? req.file.url : null,
    password: generatePassword
  });

  // hashing password
  var hash = bcrypt.hashSync(generatePassword, saltRounds);
  student.password = hash;

  // save student data
  student.save()
    .then(result => {
      if (result) {
        req.username = student.nisn,
        req.password = generatePassword;
      }

      //push student id to school
      schoolModel.findByIdAndUpdate(req.id, { $push: { students: student._id } }, { new: true }, err => {
        if (err) return next(err);
      });
      // create student score summary
      summaryModel.create({ student: student._id })
        .then(data => {
          student.score.summary = data._id;
        })
        .catch(next);

      // push student id to assigned classroom
      classroomModel.findByIdAndUpdate(req.body.kelas, { $push: { students: student._id } }, { new: true })
        .then(() => {
        })
        .catch(next);

      // token sendEmail
      var token = new Token({
        student: student._id,
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
};

// update student data
exports.update = (req, res, next) => {
  let newProfile = req.body;
  console.log(req.body)
  if (req.file) {
    newProfile.image = req.file.url;
  }
  studentModel.findByIdAndUpdate(req.params.id, {
    $set: newProfile
  }, { new: true })
    .then((updated) => {
      res.status(200).json({
        success: true,
        message: 'Sucessfully Updated The Student Profile',
        data: updated
      });
    })
    .catch(next);
};


// delete student data
exports.delete = function (req, res, next) {
  studentModel.findOneAndDelete({ _id: req.params.id })
    .then(studentData => {
      classroomModel.findByIdAndUpdate(studentData.kelas, { $pull: { students: req.params.id } })
        .then(() => { })
        .catch(next);
      return;
    })
    .then(() => {
      res.status(200).json({
        success: true
      });
    })
    .catch(next);
};

// show all students
exports.find = (req, res, next) => {
  studentModel.find()
    .populate('kelas', 'fullname')
    .populate('school', 'fullname')
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'student not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'success',
        data: data
      });
    })
    .catch(next);
};

exports.score = (req, res, next) => {
  scoreModel.find({ students: req.id }, '-students')
    .populate({
      path: 'subjects',
      select: 'name'
    })
    .populate({
      path: 'teacher',
      select: 'fullname'
    })
    .then(data => {
      const response = item => {
        return {
          _id: item._id,
          subjects: item.subjects.name,
          teacher: item.teacher.fullname,
          category: item.category,
          point: item.point
        };
      };
      res.status(200).json({
        success: true,
        message: 'success',
        data: data.map(response)
      });
    })
    .catch(next);
};

exports.findOne = (req, res, next) => {
  studentModel.findById({ _id: req.params.id }, function (err, data) {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'student data',
        data: data
      });
    }
  });
};




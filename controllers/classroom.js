const classroomModel = require('../model/classroom');

exports.create = (req, res, next) => {
  let classroom = new classroomModel({
    grade: req.body.grade,
    major: req.body.major,
    classes: req.body.classes,
    fullname: `${req.body.grade} ${req.body.major} ${req.body.classes}`,
  });
  classroom.save()
    .then(function (classroom) {
      res.status(201).json({
        success: true,
        message: 'classroom registered',
        data: classroom
      });
    })
    .catch(next);
};

exports.find = (req, res, next) => {
  classroomModel.find()
    .populate({
      path: 'students',
      select: '_id fullname nisn'
    })
    .then(function (data) {
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch(next);
};

exports.findOne = (req, res, next) => {
  classroomModel.findById({ _id: req.params.id })
    .then(function (data) {
      res.status(200).json({
        success: true,
        message: `list of students of classroom id: ${req.params.id}`,
        data: data
      });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  classroomModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(function (classroom) {
      res.status(200).json({
        success: true,
        data: classroom
      });
    })
    .catch(next);
};


exports.delete = (req, res, next) => {
  classroomModel.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      next(err);
    }
    res.status(200).json({
      success: true,
      message: 'Data is deleted'
    });
  });
};

exports.classrooms = (req, res, next) => {
  classroomModel.find({ _id: {$in: req.body.classrooms} })
    .populate('students', 'fullname nisn')
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'classrooms',
        data: data
      });
    })
    .catch(next);
};
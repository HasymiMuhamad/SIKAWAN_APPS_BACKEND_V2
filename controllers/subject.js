const subjectModel = require('../model/subjects');
// teacherModel = require('../model/teacher');

exports.create = function (req, res, next) {
  let subject = new subjectModel({
    name: req.body.name,
    school: req.id
  });
  subject.save()
    .then(function (subject) {
      res.status(201).json({
        success: true,
        message: 'subject data is created successfully',
        data: subject
      });
    })
    .catch(next);
};

exports.find = function (req, res, next) {
  subjectModel.find({})
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'all subjects',
        data: data
      });
    })
    .catch(next);
};

exports.findOne = function (req, res) {
  subjectModel.findById({ _id: req.params.id }, function (err, data) {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    } else {
      res.status(400).json({
        success: true,
        data: data
      });
    }
  });
};


exports.update = function(req, res, next){
  subjectModel.findByIdAndUpdate({_id:req.params.id}, {$set: { name: req.body.name}})
    .then(function(){
      res.status(200).json({
        success: true,
        data: req.body
      });
    })
    .catch(next);
};

exports.delete = function (req, res, next) {
  subjectModel.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      next(err);
    }
    res.status(204).json({
      success: true,
      message: 'Data is deleted successfully'
    });
  });
};

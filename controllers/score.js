const Score = require('../model/score'),
  scheduleModel = require('../model/schedule'),
  classroomModel = require('../model/classroom'),
  mongoose = require('mongoose'),
  // Classroom = require('../model/classroom'),
  // Teacher = require('../model/teacher'),
  summaryModel = require('../model/summary'),
  studentModel = require('../model/student');

exports.Create = (req, res, next) => {
  let score = new Score({
    students: req.body.students,
    subjects: req.subjects,
    teacher: req.id,
    category: req.body.category,
    point: req.body.point,
  });
  score.save()
    .then(() => {
      studentModel.findByIdAndUpdate(req.body.students, { $push: { 'score.details': score } }, { new: true })
        .then(() => {
          res.status(201).json({
            success: true,
            message: 'Score was created',
            data: score
          });
        })
        .catch(next); // catch error from line 65
    })
    .catch(next); // catch error from .save
};

exports.Details = (req, res, next) => {
  Promise.all([
    summaryModel.findOne({ student: req.params.id, teacher: req.id },
      '-teacher -_id'),
    Score.find({ students: req.params.id, teacher: req.id },
      '-students -subjects -teacher -_id')
  ])
    .then(data => {
      const response = item => {
        return {
          category: item.category,
          point: item.point
        };
      };
      res.status(200).json({
        success: true,
        message: 'score details',
        data: {
          summary: data[0],
          details: data[0].map(response)
        }
      });
    })
    .catch(next);
};

exports.Update = (req, res, next) => {
  Score.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          success: false,
          message: 'score data not found'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'score updated',
          data: data
        });
      }
    })
    .catch(next);
};

exports.scoredetails = (req, res, next) => {
  studentModel.findById(req.params.id, 'fullname nisn kelas')
    .populate('kelas', 'fullname')
    .then(result => {
      return result;
    })
    .then(student => {
      Score.find({
        teacher: req.id,
        students: req.params.id
      }, '-students -subjects -teacher -updatedAt -__v')
        .then(data => {
          res.status(200).json({
            success: true,
            message: 'student score details',
            data: {
              student: student,
              scores: data
            }
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.Delete = (req, res, next) => {
  Score.findByIdAndRemove(req.body.scoreId)
    .then(data => {
      return data;
    })
    .then(data => {
      studentModel.findByIdAndUpdate(data.students, { $pull: { 'data.score.details': req.body.scoreId } })
        .then(() => { })
        .catch(next);
      return;
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Score was deleted'
      });
    })
    .catch(next);
};

exports.score = (req, res, next) => {
  scheduleModel.find({ teacher: req.id }, 'classroom')
    .populate('classroom', '_id fullname')
    .then(data => {
      const classrooms = [],
        mapClassroom = new Map();
      for (const classroom of data) {
        // console.log(classroom.classroom);
        if (!mapClassroom.has(classroom.classroom)) {
          mapClassroom.set(classroom.classroom, true);
          classrooms.push(classroom.classroom._id);
        }
      }
      console.log(classrooms);
      return classrooms;
    })
    .then(classroomsId => {
      classroomModel.find({ _id: { $in: classroomsId } }, 'fullname')
        .populate({
          path: 'students',
          select: '_id fullname nisn'
        })
        .then(response => {
          res.status(200).json({
            success: true,
            message: 'classrooms and its students',
            data: response
          });
        })
        .catch(next);
    })
    .catch(next);
};


// exports.score = (req, res, next) => {
//   Score.find({ teacher: req.id }, '-subjects -teacher')
//     .populate({
//       path: 'students',
//       select: 'fullname nisn kelas',
//       populate: {
//         path: 'kelas',
//         select: 'fullname'
//       }
//     })
//     .then(data => {
//       const response = [],
//         mapClassroom = new Map();
//       for (const item of data) {
//         if (!item.students) {
//           continue;
//         }
//         if (!mapClassroom.has(item.students.kelas)) {
//           mapClassroom.set(item.students.kelas, true);
//           response.push({
//             classroom: item.students.kelas,
//             students: []
//           });
//           response[response.findIndex(index => index.classroom._id === item.students.kelas._id)]
//             .students.push({
//               _id: item.students._id,
//               fullname: item.students.fullname,
//               nisn: item.students.nisn
//             });
//         } else {
//           if (response[response.findIndex(index => index.classroom._id === item.students.kelas._id)]
//             .students.findIndex(student => student._id === item.students._id) === -1) {
//             response[response.findIndex(index => index.classroom._id === item.students.kelas._id)]
//               .students.push({
//                 _id: item.students._id,
//                 fullname: item.students.fullname,
//                 nisn: item.students.nisn
//               });
//           }
//         }
//       }
//       res.status(200).json({
//         success: true,
//         message: 'success',
//         data: response
//       });
//     })
//     .catch(next);
// };

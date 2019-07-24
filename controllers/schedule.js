const scheduleModel = require('../model/schedule'),
  // classroomModel = require('../model/classroom'),
  studentModel = require('../model/student'),
  teacherModel = require('../model/teacher');

// create schedule
exports.schedule = (req, res, next) => {
  if (req.body.schedules.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No Schedule to input'
    });
  }
  scheduleModel.create(req.body.schedules)
    .then(result => {
      for (let schedule of req.body.schedules) {
        teacherModel.findByIdAndUpdate(schedule.teacher, { $push: { schedule: schedule._id } }, { new: true })
          .then(teacher => {
            console.log(teacher.classroom);
          })
          .catch(next);
      }
      res.status(201).json({
        success: true,
        message: 'schedules created',
        data: result
      });
    })
    .catch(next);


};

// teacher's schedule
exports.teacherSchedule = (req, res, next) => {
  scheduleModel.find({ teacher: req.id }, '-teacher')
    .populate({
      path: 'classroom',
      select: 'fullname'
    })
    .then(data => {
      if (data.length == 0) {
        res.status(200).json({
          success: true,
          message: 'no schedules',
          data: []
        });
      } else {
        const response = item => {
          return {
            _id: item._id,
            classroom: {
              id: item.classroom._id,
              fullname: item.classroom.fullname
            },
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime
          };
        };
        res.status(200).json({
          success: true,
          message: 'Schedules found',
          data: data.map(response)
        });
      }
    })
    .catch(next);
};

// classroom schedule
exports.classroomSchedule = (req, res, next) => {
  scheduleModel.find({ classroom: req.params.id }, '-classroom')
    .populate('teacher', 'fullname')
    .then(data => {
      if (data.length == 0) {
        res.status(404).json({
          success: false,
          message: 'no schedules',
        });
      } else {
        const response = item => {
          return {
            _id: item._id,
            teacher: item.teacher.fullname,
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime
          };
        };
        res.status(200).json({
          success: true,
          message: 'schedules found',
          data: data.map(response)
        });
      }
    })
    .catch(next);
};

// show all schedules (school)
exports.schedules = (req, res, next) => {
  scheduleModel.find({})
    .populate({
      path: 'classroom',
      select: 'fullname'
    })
    .populate({
      path: 'teacher',
      select: 'fullname subjects',
      populate: { path: 'subjects', select: 'name' }
    })
    .then(data => {
      if (data.length == 0) {
        res.status(200).json({
          success: true,
          message: 'no schedules',
          data: data
        });
      } else {
        const response = item => {
          return {
            _id: item._id,
            classroom: item.classroom.fullname,
            teacher: item.teacher.fullname,
            subjects: item.teacher.subjects.name,
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime
          };
        };
        res.status(200).json({
          success: true,
          message: 'schedules found',
          data: data.map(response)
        });
      }
    })
    .catch(next);
};

// update existing schedule
exports.update = (req, res, next) => {
  scheduleModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'schedule updated',
        data: data
      });
    })
    .catch(next);
};

// delete schedule
exports.delete = (req, res, next) => {
  scheduleModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'schedule deleted'
      });

    })
    .catch(next);
};

// classroom's schedule details, lead to attendance
exports.details = (req, res, next) => {
  scheduleModel.findById(req.params.id, '-teacher')
    .populate('classroom', 'fullname')
    .then(data => {
      studentModel.find({ kelas: data.classroom._id }, '_id fullname nisn')
        .then(students => {
          res.status(200).json({
            success: true,
            message: 'schedule details',
            data: {
              schedule: data,
              students: students
            }
          });
        })
        .catch(next);
    })
    .catch(next);
};
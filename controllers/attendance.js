const Attendance = require('../model/attendance'),
  studentModel = require('../model/student');
// moment = require('moment');
// scheduleModel = require('../model/schedule');

// teacher post attendance
exports.attend = (req, res, next) => {
  for (let obj of req.body.attendances) {
    var attendance = new Attendance({
      schedule: obj.schedule,
      isAttend: obj.isAttend,
      teacher: req.id,
      student: obj.student,
      description: obj.description
    });
    attendance.save()
      .then(() => {
        studentModel.findByIdAndUpdate({ _id: obj.student }, { $push: { attendance: attendance._id } })
          .then(() => {
            console.log(`student id ${obj.student} is ${obj.description}`);
          })
          .catch(next);
      })
      .catch(next);
  }

  const response = attend => {
    return {
      id: attend._id,
      student: attend.student,
      isAttend: attend.isAttend,
      description: attend.description
    };
  };
  res.status(201).json({
    success: true,
    message: 'attendance submitted',
    data: req.body.attendances.map(response)
  });
};

// teacher update attendance
exports.update = (req, res, next) => {
  Attendance.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(data => {
      res.status(200).json({
        success: true,
        message: 'attendance updated',
        data: {
          student: data.student,
          isAttend: data.isAttend,
          description: data.description,
          updatedAt: data.updatedAt
        }
      });
    })
    .catch(next);
};

// teacher delete attendance
exports.delete = (req, res, next) => {
  Attendance.findByIdAndRemove(req.params.id)
    .then(data => {
      if (data.length === 0) {
        res.status(400).json({
          success: true,
          message: 'data not found'
        });
      } else {
        res.status(204).json({
          success: true
        });
      }
    })
    .catch(next);
};

// student get attendance
exports.attendance = (req, res, next) => {
  Attendance.find({ student: req.id }, '-teacher -student')
    .then(data => {
      const response = result => {
        return {
          id: result._id,
          date: result.createdAt,
          status: result.isAttend,
          description: result.description
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

// show history attendance 
exports.attendanceHistories = (req, res, next) => {
  Attendance.find({ teacher: req.id }, 'schedule createdAt')
    // .populate('student', 'fullname kelas')
    .populate({
      path: 'schedule',
      select: 'day startTime endTime classroom',
      populate: {
        path: 'classroom',
        select: 'fullname'
      }
    })
    .then(data => {
      const response = [],
        map = new Map();
      for (const item of data) {
        var date = item.createdAt.toDateString();
        // console.log(date);
        if (!(map.has(item.schedule) && map.has(date))) {
          map
            .set(item.schedule, true)
            .set(date, true);
          response.push(item);
        }
      }
      res.status(200).json({
        success: true,
        message: 'history schedules',
        data: response
      });
    })
    .catch(next);
};

// show history schedule(attendance) details
exports.attendanceDetails = (req, res, next) => {
  // setup date range for querying 
  var startDate = new Date(req.query.date);
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + 1);

  Attendance.find({
    schedule: req.query.schedule,
    teacher: req.id,
    createdAt: { $gte: startDate, $lt: endDate }
  }, '-teacher -updatedAt')
    .populate({
      path:'student',
      select:'_id fullname nisn'
    })
    .populate({
      path: 'schedule',
      select: 'day startTime endTime classroom',
      populate: {
        path: 'classroom',
        select: 'fullname'
      }
    })
    .then(data => {
      var students = [];
      // console.log(data);
      for (let student of data) {
        if (!student.student) {
          continue;
        } else {
          students.push({
            _id: student._id,
            student: {
              _id: student.student._id,
              fullname: student.student.fullname,
              nisn: student.student.nisn
            },
            description: student.description
          });
        }
      }
      var date = data[0].createdAt.toDateString();
      res.status(200).json({
        success: true,
        message: 'schedule history details',
        data: 
        {
          schedule: {
            classroom: data[0].schedule.classroom.fullname,
            date: date,
            day: data[0].schedule.day,
            startTime: data[0].schedule.startTime,
            endTime: data[0].schedule.endTime,
          },
          students: students
        }
      });
    })
    .catch(next);
};
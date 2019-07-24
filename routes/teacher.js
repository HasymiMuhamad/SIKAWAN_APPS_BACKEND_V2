const express = require('express'),
  router = express.Router(),
  controllerTeacher = require('../controllers/teacher'),
  // classroomController = require('../controllers/classroom'),
  scoreController = require('../controllers/score'),
  schedule = require('../controllers/schedule'),
  controllerAttend = require('../controllers/attendance');

//Teacher
router.get('/', controllerTeacher.Profile);
// router.put('/updateProfile', controllerTeacher.Update);

//Score
router.get('/score', scoreController.score);
router.get('/score/:id', scoreController.scoredetails);
// router.get('/detailScore', controllerScore.Details);
router.put('/score/:id', scoreController.Update);
router.post('/score', scoreController.Create);
router.delete('/score',scoreController.Delete);

//Attendance
router.post('/attendance', controllerAttend.attend);
router.put('/attendance/:id', controllerAttend.update); // :id is student id
router.delete('/attendance/:id', controllerAttend.delete);
router.get('/schedule/history',controllerAttend.attendanceHistories);
router.get('/schedule/history/details',controllerAttend.attendanceDetails);

// schedule
router.get('/schedule', schedule.teacherSchedule);
router.get('/schedule/:id',schedule.details);
// router.put('/schedule/:id', schedule.teacherSchedule);

router.get('/classroom', controllerTeacher.classroom);
// router.get('/classroom/:id', classroomController.findOne);
module.exports = router;

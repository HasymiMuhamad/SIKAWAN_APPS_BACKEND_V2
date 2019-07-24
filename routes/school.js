const express = require('express'),
  router = express.Router(),
  upload = require('../middleware/multer'),
  email = require('../middleware/email'),
  teacherController = require('../controllers/teacher'),
  studentController = require('../controllers/student'),
  classroomController = require('../controllers/classroom'),
  scheduleController = require('../controllers/schedule'),
  complaintController = require('../controllers/complaints'),
  subjectController = require('../controllers/subject');


//CRUD Teacher
router.post('/teacher', upload.single('image'), teacherController.registerTeacher, email.sendEmail); // register teacher
router.get('/teacher', teacherController.find); // show all teacher
router.get('/teacher/:id', teacherController.findOne); // show one teacher
router.put('/teacher/:id', upload.single('image'), teacherController.update);
router.delete('/teacher/:id', teacherController.delete);

// //CRUD Student
router.post('/student', upload.single('image'), studentController.registerStudent, email.sendEmail); // register student
router.get('/student', studentController.find); // show all student
router.get('/student/:id', studentController.findOne); // find a student
router.put('/student/:id', upload.single('image'), studentController.update); // update student data
router.delete('/student/:id', studentController.delete); // delete student data

//CRUD Classroom
router.post('/classroom', classroomController.create); // register classroom
router.get('/classroom', classroomController.find); // show all clasroom
router.get('/classroom/:id', classroomController.findOne); // find one classroom
router.put('/classroom/:id', classroomController.update); // update classroom data
router.delete('/classroom/:id', classroomController.delete); // delete classroom data
router.get('/classrooms',classroomController.classrooms); // for testing only

//CRUD Subject
router.post('/subject', subjectController.create);
router.get('/subject', subjectController.find);
router.get('/subject/:id', subjectController.findOne);
router.put('/subject/:id', subjectController.update);
router.delete('/subject/:id', subjectController.delete);


// CRUD Schedules
router.post('/schedule', scheduleController.schedule);
router.get('/schedule', scheduleController.schedules);
router.get('/schedule/classroom/:id', scheduleController.classroomSchedule);
router.delete('/schedule/:id', scheduleController.delete);

// Complaints
router.get('/oneComplaint/:id', complaintController.oneComplaint);
router.get('/complaints', complaintController.allComplaintSchool);
router.put('/response', complaintController.complaintResponse);


module.exports = router;

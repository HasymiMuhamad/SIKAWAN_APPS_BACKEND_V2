const express = require('express'),
  // multer = require('multer'),
  complaintController = require('../controllers/complaints'),
  studentControl = require('../controllers/student'),
  attendanceControl = require('../controllers/attendance'),
  upload = require('../middleware/multer'),
  router = express.Router();

router.get('/', studentControl.profile);
router.put('/updateProfile', upload.single('image'), studentControl.update);
router.get('/attendance', attendanceControl.attendance ); // get student attendance
router.get('/score', studentControl.score); // get student scores
router.get('/complaints', complaintController.getResponse);
router.get('/oneComplaint/:id', complaintController.oneComplaint);
router.post('/complaint',  upload.array('image', 4), complaintController.complaint);


module.exports = router;

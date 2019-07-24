const express = require('express'),
  // adminController = require('../controllers/admin'),
  schoolController = require ('../controllers/school'),
  doeController = require('../controllers/doe'),
  complaintController = require('../controllers/complaints'),
  router = express.Router();

router.get('/profile', doeController.profileDoe);
router.put('/updateProfile', doeController.update)

router.get('/school', schoolController.schools);
router.get('/oneSchool', schoolController.oneSchool);

router.get('/oneComplaint/:id', complaintController.oneComplaint);
router.get('/complaints', complaintController.allComplaintDoe); // show all complaint
router.put('/response', complaintController.complaintResponse);



module.exports = router;

const express = require('express'),
  adminController = require('../controllers/admin'),
  schoolController = require('../controllers/school'),
  doeController = require('../controllers/doe'),
  email = require('../middleware/email'),
  router = express.Router();

router.get('/allAdmin', adminController.allAdmin);
router.get('/profile', adminController.profileAdmin);
router.post('/', adminController.registerAdmin);
router.delete('/deleteAdmin/:id', adminController.deleteAdmin);

router.get('/doe', doeController.profileDoe);
router.post('/addDoe', doeController.registerDOE, email.sendEmail);
router.put('/updateDoe/:id', doeController.update);
router.delete('/deleteDoe/:id', doeController.deleteDOE);

router.get('/oneSchool', schoolController.oneSchool);
router.post('/addSchool', schoolController.registerSchool, email.sendEmail); // register school
router.put('/updateSchool/:id', schoolController.updateProfileSchool);
router.delete('/deleteSchool/:id', schoolController.deleteSchool);


router.get('/school', schoolController.schools);

module.exports = router;

const complaintController = require('../controllers/complaints')

router.get('/oneComplaint', complaintController.oneComplaint)
router.get('/complaints', complaintController.allComplaint)
router.put('/response', complaintController.complaintResponse)


module.exports = router;

const express = require('express');
const router = express.Router();

//const Controller = require('../controllers/subjects');

router.get('/', (req, res) =>{
  res.json({
    success: true,
    message:'Hello World'
  });
});

module.exports = router;

const mongoose = require('mongoose'),
  teaching = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');
//   functions = require('../model/functions');

var teach = new teaching({
  classroom: {
    type: teaching.Types.ObjectId,
    ref: 'classroom',
  },
  subjects: {
    type: teaching.Types.ObjectId,
    ref: 'subjects',
  },
  teacher: {
    type: teaching.Types.ObjectId,
    ref: 'teacher',
  },
  school: {
    type: teaching.Types.ObjectId,
    ref: 'school'
  }
},
{
  timestamps: true
});

teach
  .plugin(validate)
  .plugin(autopopulate);
module.exports = mongoose.model('teaching', teach);

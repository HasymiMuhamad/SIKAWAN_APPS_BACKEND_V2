const mongoose = require('mongoose'),
  summary = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');


var summarySchema = new summary({
  student: {
    type: summary.Types.ObjectId,
    ref: 'student',
  },
  subjects:{
    type: summary.Types.ObjectId,
    ref: 'subjects'
  },
  teacher: {
    type: summary.Types.ObjectId,
    ref: 'teacher'
  },
  assignment:{
    type: Number,
    default: 0,
    max: 100,
    match: [/([0-9]+)/, 'wrong format']
  },
  quiz:{
    type: Number,
    default: 0,
    max: 100,
    match: [/([0-9]+)/, 'wrong format']
  },
  uts:{
    type: Number,
    default: 0,
    max: 100,
    match: [/([0-9]+)/, 'wrong format']
  },
  uas:{
    type: Number,
    default: 0,
    max: 100,
    match: [/([0-9]+)/, 'wrong format']
  }
});

summarySchema
  .plugin(validate)
  .plugin(autopopulate);
module.exports = mongoose.model('summary',summarySchema);

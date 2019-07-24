const mongoose = require('mongoose'),
  classroom = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');

var classroomSchema = new classroom({
  grade: { // classroom grade: X,XI,XII
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  major: { // classroom major: Science,Social, etc
    type: String,
    index: true,
    lowercase: true
  },
  classes: { // classroom number: A,B,etc or 1,2, etc
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  fullname: { // classroom fullname: Grade+Major+classess: XI-Science-A
    type: String,
    required: false,
    index: true,
    lowercase: true
  },
  students: [{
    type: classroom.Types.ObjectId,
    ref: 'student'
  }],
  courses: [{
    type: classroom.Types.ObjectId,
    ref: 'teaching'
  }],
  schedule: [
    {
      type: classroom.Types.ObjectId,
      ref: 'student'
    }],
}, {
  timestamps: true
});

classroomSchema
  .plugin(validate)
  .plugin(autopopulate);
module.exports = mongoose.model('classroom', classroomSchema);

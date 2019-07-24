const mongoose = require('mongoose'),
  score = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');

var scoreSchema = new score({
  students: {
    type: score.Types.ObjectId,
    ref: 'student'
  },
  subjects:{
    type: score.Types.ObjectId,
    ref: 'subject'
  },
  teacher: {
    type: score.Types.ObjectId,
    ref: 'teacher'
  },
  category:{
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  point:{
    type: Number,
    max: 100,
    required: true,
  }
},{
  timestamps:true
});


scoreSchema
  .plugin(validate)
  .plugin(autopopulate);

module.exports = mongoose.model('score',scoreSchema);

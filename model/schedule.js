const mongoose = require('mongoose'),
  scheduleSchema = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');

var schedule = new scheduleSchema({
  classroom: {
    type: scheduleSchema.Types.ObjectId,
    ref: 'classroom',
    required: true
  },
  teacher: {
    type: scheduleSchema.Types.ObjectId,
    ref: 'teacher',
    // default: null
  },
  day: {
    type: String,
    // required: true
  },
  startTime: {
    type: String,
    // default: null
  },
  endTime: {
    type: String,
    // default: null
  }
});

schedule
  .plugin(validate);

module.exports = mongoose.model('schedule', schedule);
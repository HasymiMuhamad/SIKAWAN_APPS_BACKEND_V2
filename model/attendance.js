const mongoose = require('mongoose'),
  attend = mongoose.Schema,
  validate = require('mongoose-unique-validator');

var attendSchema = new attend({
  schedule: {
    type: attend.Types.ObjectId,
    ref: 'schedule'
  },
  isAttend:{ // True if attend, and otherwise
    type: Boolean,
    required: true,
    index: true
  },
  teacher: {
    type: attend.Types.ObjectId,
    ref: 'teacher'
  },
  student:{
    type: attend.Types.ObjectId,
    ref: 'student',
  },
  description:{ // attend, izin, sakit
    type: String,
    required: true,
    lowercase: true,
    index: true
  }
},
{timestamps:true}
);

attendSchema.plugin(validate);
module.exports = mongoose.model('attendance',attendSchema);

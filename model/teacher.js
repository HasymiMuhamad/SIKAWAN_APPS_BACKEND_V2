const mongoose = require('mongoose'),
  teacher = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  saltRounds = 10;

const teacherSchema = new teacher({
  fullname: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
  },
  pob: {
    type: String,
    lowercase: true,
    default: null
  },
  dob: {
    type: Date,
    default: null
  },
  address: {
    type: String,
    lowercase: true,
    default: null
  },
  religion: {
    type: String,
    lowercase: true,
    default: null
  },
  gender: {
    type: String,
    lowercase: true,
    default: null
  },
  image: {
    type: String,
    default: ''
  },
  nip: {
    type: String,
    required: [true, 'can\'t be empty'],
    minlength: 10,
    unique: [true, 'NIP has already been registered'],
    match: [/([0-9]+)/, 'wrong format']
  },
  school: {
    type: teacher.Types.ObjectId,
    ref: 'school'
  },
  subjects: {
    type: teacher.Types.ObjectId,
    ref: 'subject'
  },
  attendance: [{
    type: teacher.Types.ObjectId,
    ref: 'attendance'
  }],
  classroom: [{ // list of classroom
    type: teacher.Types.ObjectId,
    ref: 'classroom',
  }],
  schedule: [{
    type: teacher.Types.ObjectId,
    ref: 'schedule'
  }],
  email: {
    type: String,
    lowercase: true,
    required: [true, 'can\'t be blank'],
    unique: [true, 'this email has already been registered'],
    index: true,
    match: [/\S+@\S+.\S+/, 'wrong format']
  },
  password: {
    type: String,
    required: false,
    index: true,
    minlength: 6,
  },
  isVerified: {type: Boolean, default: false},
  role: {
    type: String,
    index: true,
    default: 'teacher'
  }
},
{ timestamps: true });

teacherSchema.methods.setPassword = function (password) {
  var hashed = bcrypt.hashSync(password, saltRounds);
  this.password = hashed;
};

// Enable Mongoose getter functions
teacherSchema.set('toObject', { getters: true });
teacherSchema.set('toJSON', { getters: true });

teacherSchema.plugin(validate);
teacherSchema.plugin(autopopulate);
module.exports = mongoose.model('teacher', teacherSchema);

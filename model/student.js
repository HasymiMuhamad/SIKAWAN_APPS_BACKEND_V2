const mongoose = require('mongoose'),
  Student = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  validate = require('mongoose-unique-validator');
// functions = require('../model/functions');

var studentSchema = new Student({
  fullname: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
  },
  pob: { // Place Of Birth
    type: String,
    lowercase: true,
  },
  dob: { // Date of birth
    type: Date
  },
  parent: { // parent name
    type: String,
    lowercase: true,
  },
  address: {
    type: String,
    lowercase: true,
  },
  religion: {
    type: String,
    lowercase: true,
  },
  gender: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String,
    default: ''
  },
  phoneNumber:{
    type: String,
    required: false,
    unique: false,
    match: [/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'wrong format']
  },
  nisn :{
    type: String,
    required: [true, 'can\'t be empty'],
    minlength: 10,
    unique: [true, 'NISN has already been registered'],
    match: [/([0-9]+)/, 'wrong format']
  },
  school: {
    type: Student.Types.ObjectId,
    ref: 'school',
    default: null
  },
  kelas: {
    type: Student.Types.ObjectId,
    ref: 'classroom',
  },
  isGraduated: {
    type: Boolean,
    default: false
  },
  learning: [{ // list of subjects this student learn
    type: Student.Types.ObjectId,
    ref: 'teaching',
    default: null
  }],
  score: {
    summary: {
      type: Student.Types.ObjectId,
      ref: 'summary',
      default: null
    },
    details: [{
      type: Student.Types.ObjectId,
      ref: 'score',
      default: null
    }]
  },
  attendance: [{
    type: Student.Types.ObjectId,
    ref: 'attendance'
  }],
  email: {
    type: String,
    lowercase: true,
    required: [true,'can\'t be blank'],
    unique: [true, 'this email has already been registered'],
    index: true,
    match: [/\S+@\S+.\S+/, 'wrong format']
  },
  password: {
    type: String,
    // required: true,
    index: true,
    minlength: 6
  },
  isVerified: {type: Boolean, default: false},
  role: {
    type: String,
    index: true,
    default: 'student'
  },
  complaint:[{
    type: Student.Types.ObjectId,
    ref:'complaint'
  }]
},
{
  timestamps: {
    createdAt: 'Created at',
    updatedAt: 'Updated at'
  }
});

// Enable Mongoose getter functions
studentSchema.set('toObject', { getters: true });
studentSchema.set('toJSON', { getters: true });

studentSchema
  .plugin(validate)
  .plugin(autopopulate);
module.exports = mongoose.model('student', studentSchema);



// redis ==> caching
// task queue/ backgroound preocessing
// nodemailer ==> automatic email sender
// mailgun for smtp email
// elastic search
// process vs thread



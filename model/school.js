const mongoose = require('mongoose'),
  school = mongoose.Schema,
  autopopulate = require('mongoose-autopopulate'),
  functions = require('../model/functions'),
  validate = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  saltRounds = 10;

var schoolSchema = new school({

  //generalDetails
  fullname:{ // nama sekolah: SmodMAN 1 Matauli Pandan
    type: String,
    //match: [/^[A-Za-z]/],
    //get: functions.titleCase
    // required: true,
    // index: true,
    //lowercase: true,
  },
  password:{
    type: String
  },
  npsn:{ // code sekolah nasional
    type: String,
    // required: true,
    // index: true,
    lowercase: true,
    // unique: true
  },
  type:{ // jenis sekolah, negeri/swasta
    type: String,
    // required: true,
    // index: true
  },
  akreditasi:{ // kalo ada akreditasi
    type: String,
    // required: true,
    // index: true,
    lowercase: true
  },
  phone:{ // nomor telepon sekolah
    type: String,
    // required: true,
    // index: true
  },
  website:{
    type: String,
    // required: true
  },

  //locationDetails
  country:{
    type: String,
    // required: true,
    lowercase: true,
  },
  province:{
    type: String,
    // required: true,
    lowercase: true,
  },
  kabupaten:{
    type: String,
    // required: true,
    lowercase: true,
  },
  kecamatan:{
    type: String,
    // required: true,
    lowercase: true,
  },
  address:{
    type: String,
    // required: true,
    lowercase: true,
  },
  zip:{
    type: Number,
    // required: true,
    lowercase: true,
  },
  doe : {
    type: school.Types.ObjectId,
    ref: 'depOfEdu'
  },
  headmaster:{
    type: school.Types.ObjectId,
    ref: 'teacher',
  },
  teachers:[{
    type: school.Types.ObjectId,
    ref: 'teacher',
  }],
  numOfTeachers:{
    type: Number,
    default: null
  },
  students:[{
    type: school.Types.ObjectId,
    ref: 'student',
  }],
  numOfStudents:{
    type: Number,
    default: null
  },
  // doe:{
  //   type: school.Types.ObjectId,
  //   ref: 'depOfEdu',
  // },
  //account
  email: {
    type: String,
    lowercase: true,
    // required: [true,'can\'t be blank'],
    unique: [true, 'this email has already been registered'],
    // index: true,
    match: [/\S+@\S+.\S+/, 'wrong format']
  },
  // password: {
  //   type: String,
  //   //required: true,
  //   // index: true,
  //   minlength: 6
  // },
  isVerified: {type: Boolean, default: false},
  role:{
    type: String,
    index: true,
    default: 'school'
  }},
{timestamps:{
  createdAt:'Created at',
  updatedAt:'Updated at'
}
}
);

schoolSchema.set('toObject', {getters: true});
schoolSchema.set('toJSON', {getters : true});

schoolSchema.methods.setPassword = function (password) {
  var hashed = bcrypt.hashSync(password, saltRounds);
  this.password = hashed;
};

schoolSchema
  .plugin(validate)
  .plugin(autopopulate);

module.exports = mongoose.model('school',schoolSchema);

const mongoose = require('mongoose'),
  doe = mongoose.Schema,
  validate = require('mongoose-unique-validator'),
  // functions = require('../model/functions'),
  bcrypt = require('bcrypt'),
  saltRounds = 10;

var doeSchema = new doe({
  fullname: { // nama departemen: Bandung Department of Education
    type: String,
    //required: true,
    index: true,
    lowercase: true,
    unique: true
  },
  // phone:{ // doe phone number
  //   type: String,
  //   index: true,
  //   default: null
  // },
  // website:{ // doe website
  //   type: String,
  //   default: null
  // } ,
  email: {
    type: String,
    lowercase: true,
    required: [true, 'can\'t be blank'],
    unique: [true, 'this email has already been registered'],
    index: true,
    match: [/\S+@\S+.\S+/, 'wrong format']
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  password: {
    type: String
  },
  // country:{
  //   type: String,
  //   //required: true,
  //   lowercase: true,
  //   match: [/^[A-Za-z]+$/, 'wrong format']
  // },
  // province:{
  //   type: String,
  //   //required: true,
  //   lowercase: true,
  //   //match: [/^[A-Za-z]+$/, 'wrong format']
  // },
  // kabupaten:{
  //   type: String,
  //   //required: true,
  //   lowercase: true,
  //   match: [/^[A-Za-z]+$/, 'wrong format']
  // },
  // kecamatan:{
  //   type: String,
  //   //required: true,
  //   lowercase: true,
  //   match: [/^[A-Za-z]+$/, 'wrong format']
  // },
  // address:{
  //   type: String,
  //   //required: true,
  //   lowercase: true,
  // },
  // zip:{
  //   type: Number,
  //   //required: true,
  // },
  school: [{
    type: doe.Types.ObjectId,
    ref: 'school'
  }],
  complaints: [{
    type: doe.Types.ObjectId,
    ref: 'complaint'
  }],
  role: {
    type: String,
    index: true,
    default: 'doe'
  }
}, {
  timestamps: true
});


doeSchema.methods.setPassword = function (password) {
  var hashed = bcrypt.hashSync(password, saltRounds);
  this.password = hashed;
};

doeSchema.plugin(validate);
module.exports = mongoose.model('depOfEdu', doeSchema);

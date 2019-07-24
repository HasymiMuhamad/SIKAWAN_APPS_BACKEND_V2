const mongoose = require('mongoose'),
  complaint = mongoose.Schema,
  path = require('path'),
  validate = require('mongoose-unique-validator'),
  functions = require('../model/functions');

var complaintSchema = new complaint({
  complaint:{
    type: String,
    required: true,
    index: true,
  },
  user:{ // diisi ID siswa
    type: complaint.Types.ObjectId,
    ref : 'student'
  },
  school:{ // diisi ID sekolah
    type: complaint.Types.ObjectId,
    ref: 'school'
  },
  doe:{
    type: complaint.Types.ObjectId,
    ref:'depOfEdu'
  },
  image:[{
    type: String
  }],
  statusResponseSchool:{
    type : Boolean,
    default: false
  },
  approvedDoe:{
    type: Boolean,
    default: false
  },
  responseSchool:{
    type: String,
    minLength : 12
  }
},{
  timestamps:true
});


complaintSchema.set('toObject', {getters: true});
complaintSchema.set('toJSON', {getters : true});

complaintSchema.plugin(validate);
module.exports = mongoose.model('complaint',complaintSchema);

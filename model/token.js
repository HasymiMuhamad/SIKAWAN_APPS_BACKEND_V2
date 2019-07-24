const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  // _userId : {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'depOfEdu'},
  doe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'depOfEdu'
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'school'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  },
    token: {
    type: String
    },
}, {
  timestamps:{
    createdAt: 'Created-at',
    updatedAt: 'Updated-at'
  }
})

module.exports = mongoose.model('Token', tokenSchema)

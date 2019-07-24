const mongoose = require('mongoose'),
  admin = mongoose.Schema,
  validate = require('mongoose-unique-validator');

var adminSchema = new admin({
  username: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    unique: true,
    //match: [/^[A-Za-z]+$/, 'wrong format'],
  },
  password: {
    type: String,
    // required: true,
    // index: true,
    // minlength: 6
    default : 'abcabc'
  },
  role:{
    type: String,
    default: 'admin'
  }
},
{
  timestamps: {
    createdAt: 'Created at',
    updatedAt: 'Updated at'
  }
}
);

adminSchema.plugin(validate);
module.exports = mongoose.model('admin', adminSchema);

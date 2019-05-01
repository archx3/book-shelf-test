const mongoose = require('mongoose');

const UserSettingsSchema = mongoose.Schema(
{
  theme : {
    type : String,
    default : 'light' // alt dark
  },
  product_display_mode : {
    type : String,
    default : 'list' // alt grid
  }
});

const UserSchema = mongoose.Schema(
{
  first_name  : {
    type     : String,
    required : true
  },
  last_name   : {
    type     : String,
    required : true
  },
  email       : {
    type     : String,
    required : true,
    unique : true
  },
  username    : {
    type     : String,
    required : true,
    unique : true
  },
  password    : {
    type     : String,
    required : true
  },
  dob         : {
    type     : mongoose.Schema.Types.Date,
    required : true
  },
  profile_pic : String,

  address : require('./Address'), //has the address schema

  settings : {
    type : UserSettingsSchema
  }
});

module.exports = mongoose.model('User', UserSchema);

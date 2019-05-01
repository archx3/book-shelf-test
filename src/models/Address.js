const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema(
{
  phone : String,
  location : String,
  correspondence : String,
});

module.exports = AddressSchema;

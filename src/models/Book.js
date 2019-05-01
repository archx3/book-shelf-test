const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
  {
    title         : {
      type     : String,
      required : true
    },
    author        : {
      type     : String,
      required : true
    },
    genre     : [String],
    book_pic : String,
    date_created : {
      type    : Date,
      default : Date
    },
    date_modified : {
      type : Date,
      default : null
    }
  });

module.exports = mongoose.model('Book', BookSchema);

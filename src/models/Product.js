const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
{
  name         : {
    type     : String,
    required : true
  },
  price        : {
    type     : Number,
    required : true
  },
  category     : [String],
  date_created : {
    type    : Date,
    default : Date
  },
  date_modified : {
    type : Date,
    default : null
  },
  product_pic : String,
  description : String,
  sizes : [String]
});

const Product = mongoose.model('product', ProductSchema);

module.exports = {Product , ProductSchema};

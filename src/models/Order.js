const mongoose = require('mongoose');

const OrderItemSchema = mongoose.Schema(
{
  product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product',
    required : true,
  },
  quantity : {
    type : Number,
    required : true
  },
  sale_price : Number
});

const OrderSchema = mongoose.Schema(
  {
    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : true
    },
    items  : {
      type : [OrderItemSchema],
      required : true
    },
    discount : {
      discount_type : {type : String, default : null}, // could be percentage or fixed value
      amount : {type : Number, default : 0}
    },
    date_created : {
        type    : Date,
        default : Date
      },
      date_modified : {
        type : Date,
        default : null
      }
  });

module.exports = mongoose.model('order', OrderSchema);

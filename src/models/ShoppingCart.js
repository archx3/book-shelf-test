const mongoose = require('mongoose');

const ShoppingCartSchema = mongoose.Schema(
  {
    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : true,
    },
    items  : {
      type : [OrderItemSchema],
      required : true
    },
  });

module.exports = mongoose.model('shopping_cart', ShoppingCartSchema);


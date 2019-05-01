const order = require('../../../models/Order');

let routes = [
  { //GET Single Item
    method  : 'GET',
    name    : 'shopping-cart',
    handler : function (req, res, next)
    {
      //console.log('GET request');
      //res.send('You\'re home safely')
      order.find()
           .select('_id items date_created date_modified')
           .then(function (cart)
                 {
                   //if(cart.length >= 0){
                   res.status(200)
                      .json({
                              message : '',
                              result  : cart,
                              request : {
                                method : 'GET',
                                url    : 'http://localhost/api/shopping-cart/'

                              },
                            })
                   //}else {}
                 })
           .catch(err =>
                  {
                    // the code in this function is overriding what's in the Custom error handling middleware
                    console.log(err);
                    res.status(500)
                       .json({
                               error   : err,
                               request : {
                                 method : 'GET',
                                 url    : 'http://localhost/api/shopping-cart/'

                               }
                             });
                  })
    }
  },
  {
    method  : 'GET',
    name    : 'shopping-cart/:id',
    handler : function (req, res, next)
    {
      order.findById({ _id : req.params.id })
           .select('_id items date_created date_modified')
           .then(function (order)
                 {
                   if (order)
                   { //order found let's send it to the client
                     console.log(order);
                     res.status(200)
                        .json({
                                message : 'success',
                                result  : order,
                                request : {
                                  method : 'GET',
                                  url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                }
                              });
                   }
                   else
                   { //Nothing found with that ID, let's inform the user accordingly
                     res.status(404)
                        .json({
                                message : `No valid entry for id: ${req.params.id}`,
                                request : {
                                  method : 'GET',
                                  url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                }
                              });
                   }
                 })
           .catch(err =>
                  {
                    // the code in this function is overriding what's in the Custom error handling middleware
                    console.log(err);
                    res.status(500)
                       .json({
                               error   : err,
                               request : {
                                 method : 'GET',
                                 url    : `http://localhost/api/shopping-cart/${req.params.id || ''}`
                               }
                             });
                  })
    }
  },
  {
    //CREATE a new Item
    method  : 'POST',
    name    : 'shopping-cart',
    handler : function (req, res, next)
    {
      //let ninja = new order(req.body);
      //ninja.save();
      //The line below replaces the 2 lines above
      //res.send('order')
      console.log(req.body);
      order.create(req.body)
           .then(order =>
                 {
                   console.log(order);
                   if (order)
                   {
                     res.status(200)
                        .json({
                                message : '',
                                result  : order,
                                request : {
                                  method : 'POST',
                                  url    : 'http://localhost/api/shopping-cart/'
                                }
                              })
                   }
                   else
                   {
                     res.status(401)
                        .json({
                                message : 'Item creation failed',
                                result  : null,
                                request : {
                                  method : 'POST',
                                  url    : 'http://localhost/api/shopping-cart/'
                                }
                              })
                   }
                 })
           .catch(err =>
                  {
                    res.status(500)
                       .json({
                               error   : err,
                               request : {
                                 method : 'POST',
                                 url    : 'http://localhost/api/shopping-cart/'
                               }
                             })
                  });
    }
  },
  {
    //UPDATE the fields in a particular Item
    method  : 'PUT',
    name    : 'shopping-cart/:id',
    handler : function (req, res, next)
    {
      //console.log(req.body);
      req.body['date_modified'] = new Date();
      order.findByIdAndUpdate({ _id : req.params.id }, req.body)
           .then(function (order)
                 {
                   if (order)
                   {
                     //Get the Updated Ninja Item
                     order.findOne({ _id : req.params.id })
                          .select('_id items date_created date_modified')
                          .then(function (updatedorder)
                                {
                                  res.status(200)
                                     .send({
                                             message : 'success',
                                             result  : updatedorder,
                                             request : {
                                               method : 'PUT',
                                               url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                             }
                                           });
                                });
                   }
                   else
                   { //Nothing found with that ID, let's inform the user accordingly
                     res.status(404)
                        .json({
                                message : `No valid entry for id: ${req.params.id}`,
                                request : {
                                  method : 'PUT',
                                  url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                }
                              });
                   }
                 })
           .catch(err =>
                  {
                    res.status(500)
                       .json({
                               error   : err,
                               request : {
                                 method : 'PUT',
                                 url    : `http://localhost/api/shopping-cart/${req.params.id || ''}`
                               }
                             })
                  })
    }
  },
  {
    //DELETE Item from db
    method  : 'DELETE',
    name    : 'shopping-cart/:id',
    handler : function (req, res, next)
    {
      order.findByIdAndRemove({ _id : req.params.id })
           .then(function (order)
                 {
                   if (order)
                   {
                     res.status(200)
                        .send({
                                message : 'success',
                                result  : order,
                                request : {
                                  method : 'DELETE',
                                  url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                }
                              })
                   }
                   else
                   { //Nothing found with that ID, let's inform the user accordingly
                     res.status(404)
                        .json({
                                message : `No valid entry for id: ${req.params.id}`,
                                request : {
                                  method : 'DELETE',
                                  url    : `http://localhost/api/shopping-cart/${req.params.id}`
                                }
                              });
                   }
                   //execute the next function
                   //Which in this case is the Error handling middleware in index.js
                 })
           .catch(err =>
                  {
                    console.log(err);
                    res.status(500)
                       .json({
                               error   : err,
                               request : {
                                 method : 'DELETE',
                                 url    : `http://localhost/api/shopping-cart/${req.params.id || ''}`
                               }
                             })
                  });

    }
  }
];

//Export an array with the route Group Name and the routes
module.exports = routes;



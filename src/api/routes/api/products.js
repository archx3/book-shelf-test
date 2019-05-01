const Product = require('../../../models/Product').Product;
//const multer = require('multer');
const upload = require('../../../lib/helpers').upload;
const checkAuth = require('../../middleware/check-auth');

let routes = [
  { //GET Single Item
    method  : 'GET',
    name    : 'products',
    // handler can be a single function or an array of functions
    handler : function (req, res, next)
    {
      //console.log('GET request');
      //res.send('You\'re home safely')
      Product.find()
             .then(function (products)
                   {
                     //if(products.length >= 0){
                     res.status(200)
                        .json({
                                message : '',
                                result  : products,
                                request : {
                                  method : 'GET',
                                  url    : `http://localhost:${process.env.port || 3000}/api/products/`

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
                                   url    : 'http://localhost/api/products/'

                                 }
                               });
                    })
    }
  },
  {
    method  : 'GET',
    name    : 'products/:id',
    handler : function (req, res, next)
    {
      Product.findById({ _id : req.params.id })
             .then(function (product)
                   {
                     if (product)
                     { //product found let's send it to the client
                       console.log(product);
                       res.status(200)
                          .json({
                                  message : 'success',
                                  result  : product,
                                  request : {
                                    method : 'GET',
                                    url    : `http://localhost/api/products/${req.params.id}`
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
                                    url    : `http://localhost/api/products/${req.params.id}`
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
                                   url    : `http://localhost/api/products/${req.params.id || ''}`
                                 }
                               });
                    })
    }
  },
  {
    //CREATE a new Item
    method  : 'POST',
    name    : 'products',
    handler : [checkAuth,
               upload({
                        destination : 'uploads/products',
                        optional : true,
                        mimeTypes : ['image/png', 'image/jpeg', "image/gif"] })
                 .single('product_pic'),
               function (req, res, next)
               {
                 //let set the filename from that wich we received
                 req.body["product_pic"] = req.file ? req.file.filename : "";
                 Product.create(req.body)
                        .then(product =>
                              {
                                console.log(product);
                                if (product)
                                {
                                  res.status(200)
                                     .json({
                                             message : '',
                                             result  : product,
                                             request : {
                                               method : 'POST',
                                               url    : 'http://localhost/api/products/'
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
                                               url    : 'http://localhost/api/products/'
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
                                              url    : 'http://localhost/api/products/'
                                            }
                                          })
                               });
               }]
  },
  {
    //UPDATE the fields in a particular Item
    method  : 'PUT',
    name    : 'products/:id',
    handler : [checkAuth,
               function (req, res, next)
               {
                 //console.log(req.body);
                 req.body['date_modified'] = new Date();
                 Product.findByIdAndUpdate({ _id : req.params.id }, req.body)
                        .then(function (product)
                              {
                                if (product)
                                {
                                  //Get the Updated Ninja Item
                                  Product.findOne({ _id : req.params.id })
                                         .select('_id name category type date_created date_modified')
                                         .then(function (updatedProduct)
                                               {
                                                 res.status(200)
                                                    .send({
                                                            message : 'success',
                                                            result  : updatedProduct,
                                                            request : {
                                                              method : 'PUT',
                                                              url    : `http://localhost/api/products/${req.params.id}`
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
                                               url    : `http://localhost/api/products/${req.params.id}`
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
                                              url    : `http://localhost/api/products/${req.params.id || ''}`
                                            }
                                          })
                               })
               }]
  },
  {
    //DELETE Item from db
    method  : 'DELETE',
    name    : 'products/:id',
    handler : [checkAuth,
               function (req, res, next)
               {
                 Product.findByIdAndRemove({ _id : req.params.id })
                        .then(function (product)
                              {
                                if (product)
                                {
                                  res.status(200)
                                     .send({
                                             message : 'success',
                                             result  : product,
                                             request : {
                                               method : 'DELETE',
                                               url    : `http://localhost/api/products/${req.params.id}`
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
                                               url    : `http://localhost/api/products/${req.params.id}`
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
                                              url    : `http://localhost/api/products/${req.params.id || ''}`
                                            }
                                          })
                               });

               }]
  }
];

//Export an array with the route Group Name and the routes
module.exports = routes;



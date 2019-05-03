const Book = require('../../models/Book');

let controller = {
  getAll    : function (req, res, next)
  {
    //console.log('GET request');
    //res.send('You\'re home safely')
    Book.find()
        .select('_id title author genre date_created date_modified')
        .then(function (books)
              {
                //if(books.length >= 0){
                res.status(200)
                   .json({
                           message : '',
                           result  : books,
                           request : {
                             method : 'GET',
                             url    : 'http://localhost/api/books/'

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
                              url    : 'http://localhost/api/books/'

                            }
                          });
               })
  },
  getSingle : function (req, res, next)
  {
    Book.findById({ _id : req.params.id })
        .select('_id  title author genre date_created date_modified')
        .then(function (book)
              {
                if (book)
                { //book found let's send it to the client
                  console.log(book);
                  res.status(200)
                     .json({
                             message : 'success',
                             result  : book,
                             request : {
                               method : 'GET',
                               url    : `http://localhost/api/books/${req.params.id}`
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
                               url    : `http://localhost/api/books/${req.params.id}`
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
                              url    : `http://localhost/api/books/${req.params.id || ''}`
                            }
                          });
               })
  },
  create : function (req, res, next)
  {
    //let ninja = new book(req.body);
    //ninja.save();
    //The line below replaces the 2 lines above
    //res.send('book')
    console.log(req.body);
    Book.create(req.body)
        .then(book =>
              {
                console.log(book);
                if (book)
                {
                  res.status(200)
                     .json({
                             message : {
                               success : 1
                             },
                             result  : book,
                             request : {
                               method : 'POST',
                               url    : 'http://localhost/api/books/'
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
                               url    : 'http://localhost/api/books/'
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
                              url    : 'http://localhost/api/books/'
                            }
                          })
               });
  },
  delete : function (req, res, next)
  {
    Book.findByIdAndRemove({ _id : req.params.id })
        .then(function (book)
              {
                if (book)
                {
                  res.status(200)
                     .send({
                             message : 'success',
                             result  : book,
                             request : {
                               method : 'DELETE',
                               url    : `http://localhost/api/books/${req.params.id}`
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
                               url    : `http://localhost/api/books/${req.params.id}`
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
                              url    : `http://localhost/api/books/${req.params.id || ''}`
                            }
                          })
               });

  },
  edit       : function (req, res, next)
  {
    //console.log(req.body);
    req.body['date_modified'] = new Date();
    Book.findByIdAndUpdate({ _id : req.params.id }, req.body)
        .then(function (book)
              {
                if (book)
                {
                  //Get the Updated Ninja Item
                  Book.findOne({ _id : req.params.id })
                      .select('_id  title author genre date_created date_modified')
                      .then(function (updatedBook)
                            {
                              res.status(200)
                                 .send({
                                         message : 'success',
                                         result  : updatedBook,
                                         request : {
                                           method : 'PUT',
                                           url    : `http://localhost/api/books/${req.params.id}`
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
                               url    : `http://localhost/api/books/${req.params.id}`
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
                              url    : `http://localhost/api/books/${req.params.id || ''}`
                            }
                          })
               })
  }
};

module.exports = controller;

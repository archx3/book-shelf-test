const User = require('../../models/User');
const helpers = require('../../lib/helpers');
const passport = require('passport');
const jwt = require('jsonwebtoken');
let createUser = function(req, res, next){
  User.create(req.body)
      .then(user =>
            {
              console.log(user);
              if (user)
              {
                res.status(200)
                   .json({
                           message : {
                             success : 1
                           },
                           result  : user,
                           request : {
                             method : 'POST',
                             url    : 'http://localhost/api/users/'
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
                             url    : 'http://localhost/api/users/'
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
                            url    : 'http://localhost/api/users/'
                          }
                        })
             });
};
let controller = {
  getAll    : function (req, res, next)
  {
    User.find()
        .then(function (users)
              {
                //if(users.length >= 0){
                res.status(200)
                   .json({
                           message : '',
                           result  : users,
                           request : {
                             method : 'GET',
                             url    : 'http://localhost/api/users/'

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
                              url    : 'http://localhost/api/users/'

                            }
                          });
               })
  },
  getSingle : function (req, res, next)
{
  User.findById({ _id : req.params.id })
      .then(function (user)
            {
              if (user)
              { //User found let's send it to the client
                console.log(user);
                res.status(200)
                   .json({
                           message : 'success',
                           result  : user,
                           request : {
                             method : 'GET',
                             url    : `http://localhost/api/users/${req.params.id}`
                           }
                         });
              }
              else
              { //Nothing found with that ID, let's inform the User accordingly
                res.status(404)
                   .json({
                           message : `No valid entry for id: ${req.params.id}`,
                           request : {
                             method : 'GET',
                             url    : `http://localhost/api/users/${req.params.id}`
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
                            url    : `http://localhost/api/users/${req.params.id || ''}`
                          }
                        });
             })
},
  login : function (req, res, next)
  {
      if (req.isAuthenticated()) {
        res.redirect('/')
      }else{
        res.render('login');
      }
  },logout : function (req, res, next)
  {
    req.logout();
    res.redirect('/');
  },
  attemptLogin : function (req, res, next)
  {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.error(err);
      }
      console.log('here');
      req.login(user, (er) => {
        //FIXME DO NOT
        console.log("User: " + req.user);
        if (user)
        {
          //TODO work on dashboard
          res.redirect('/');
        }
      });
    })(req, res, next);
  },

  checkAvailability : function (req, res, next)
  {
    /*User.findOne({ `${req.params.property}` : req.params.value })
     .then(function (user) {
     if(user){
     // There's someone with the same property : value let's inform
     res.status(200)
     .json({
     message : `${req.params.property} ${req.params.value} is already in use`,
     result : true,
     request : {
     method : 'GET',
     url    : `http://localhost/api/users/check_availability/${req.params.property}/${req.params.value}`
     }
     })
     }
     else{
     // No user with the same property : value exists
     res.status(200)
     .json({
     message : `${req.params.property} ${req.params.value} is not in use`,
     result : false,
     request : {
     method : 'GET',
     url    : `http://localhost/api/users/check_availability/${req.params.property}/${req.params.value}`
     }
     })
     }
     })*/
  },
  register    : function (req, res, next)
  {
    //let's ensure account uniqueness
    // phone number username and email must be unique
    if(req.body.password)
    {
      // Let's check Whether there is't a user registered with that email
      User.findOne({ email : req.body.email })
          .then(function (user)
                {
                  if(user){
                    // There's someone with the same let's inform
                    res.status(409)
                       .json({
                               message : 'Email is already in use',
                               request : {
                                 method : 'POST',
                                 url    : 'http://localhost/api/users/'
                               }
                             })
                  }
                  else{
                    // Let's check Whether there is't a user registered with that username
                    User.findOne({ username : req.body.username })
                        .then(function (user){
                          if(user){
                            // There's someone with the same let's inform
                            res.status(409)
                               .json({
                                       message : 'Username is already in use',
                                       request : {
                                         method : 'POST',
                                         url    : 'http://localhost/api/users/'
                                       }
                                     })
                          }
                          else {
                            //No user with the same email or username exists so we can go ahead and save it
                            //let's hash the password
                            helpers.hash(req.body.password, (err, hash) =>
                            {
                              if (!err)
                              {
                                req.body.password = hash;
                                createUser(req, res, next);
                              }
                            });
                          }
                        })
                  }
                });


    }

  },
  delete    : function (req, res, next)
  {
    User.findByIdAndRemove({ _id : req.params.id })
        .then(function (user)
              {
                if (user)
                {
                  res.status(200)
                     .send({
                             message : 'success',
                             result  : user,
                             request : {
                               method : 'DELETE',
                               url    : `http://localhost/api/users/${req.params.id}`
                             }
                           })
                }
                else
                { //Nothing found with that ID, let's inform the User accordingly
                  res.status(404)
                     .json({
                             message : `No valid entry for id: ${req.params.id}`,
                             request : {
                               method : 'DELETE',
                               url    : `http://localhost/api/users/${req.params.id}`
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
                              url    : `http://localhost/api/users/${req.params.id || ''}`
                            }
                          })
               });

  },
  edit      : function (req, res, next)
  {
    //console.log(req.body);
    req.body['date_modified'] = new Date();
    User.findByIdAndUpdate({ _id : req.params.id }, req.body)
        .then(function (user)
              {
                if (user)
                {
                  //Get the Updated Ninja Item
                  user.findOne({ _id : req.params.id })
                      .select('_id first_name last_name username password email dob profile_pic address date_created date_modified')
                      .then(function (updateduser)
                            {
                              res.status(200)
                                 .send({
                                         message : 'success',
                                         result  : updateduser,
                                         request : {
                                           method : 'PUT',
                                           url    : `http://localhost/api/users/${req.params.id}`
                                         }
                                       });
                            });
                }
                else
                { //Nothing found with that ID, let's inform the User accordingly
                  res.status(404)
                     .json({
                             message : `No valid entry for id: ${req.params.id}`,
                             request : {
                               method : 'PUT',
                               url    : `http://localhost/api/users/${req.params.id}`
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
                              url    : `http://localhost/api/users/${req.params.id || ''}`
                            }
                          })
               })
  }
};

module.exports = controller;

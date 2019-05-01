const User = require('../../../models/User');
const helpers = require('../../../lib/helpers');
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
                           message : '',
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

let routes = [
  { //GET Single Item
    method  : 'GET',
    name    : 'users',
    handler : function (req, res, next)
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
    }
  },
  { //GET Single Item
    //
    method  : 'GET',
    name    : 'users/check_availability/:property/:vallue',
    handler : function (req, res, next)
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
    }
  },
  {
    method  : 'GET',
    name    : 'users/:id',
    handler : function (req, res, next)
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
    }
  },
  {
    //CREATE a new Item
    method  : 'POST',
    name    : 'users/signup',
    handler : function (req, res, next)
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

    }
  },
  {
    //login user a new Item
    method  : 'POST',
    name    : 'users/login',
    /**
     *
     * @param req {{body : {password : string, email : String, phone : String}}}
     * @param res
     * @param next
     */
    handler : function (req, res, next)
    {
      // let's allow using username|email|phone number to login
      // //Let's determine (using) whether it' a username, email, or password they are logging in with
      // Let's implement the email first
      let findOptions = {email : req.body.email};
      // using find because it will return multiple users which is necessary when logging in in with phone number
      // as more than one account can have one phone number
      // when more that one account has the same phone number
      // and the same password, we'll login the first occurrence
      console.log(req.body.email);
      let userIdType = 'email';
      User.find(findOptions)
          .then(function (users)
          {
            console.log(users);
            if(users.length > 0)
            {
              // we have the person(s) let's try logging them in
              //In the case of phone number login we'll try all the accounts
              let user = userIdType === 'email' || userIdType === 'username' ? users[0] : users;
              console.log('user', user);
              helpers.compareHash(req.body.password, user.password, function (err, match)
              {
                if (match)
                {
                  const token = jwt.sign(
                    {
                      email : user.email,
                      username : user.username,
                      phone : user.phone || "",
                      userId : user._id
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn : "1h"
                    });
                  return res.status(200)
                            .json({
                                    token   : token,
                                    message : 'Auth successful'
                                  });
                }
                return res.status(401)
                          .json({ err : err,
                                  message : 'Auth failed' });
              })
            }else{
              return res.status(401)
                        .json({message : 'Auth failed'});
            }
          }).catch(err => {
        console.log(err);
      })
    }
  },
  {
    //UPDATE the fields in a particular Item
    method  : 'PUT',
    name    : 'users/:id',
    handler : function (req, res, next)
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
  },
  {
    //DELETE Item from db
    method  : 'DELETE',
    name    : 'users/:id',
    handler : function (req, res, next)
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

    }
  }
];



//Export an array with the route Group Name and the routes
module.exports = routes;



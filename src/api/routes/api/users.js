const User = require('../../../models/User');
const helpers = require('../../../lib/helpers');
const jwt = require('jsonwebtoken');
let userController = require('../../controllers/userControllers');

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
  { //GET All Items
    method  : 'GET',
    name    : 'users',
    handler : userController.getAll
  },
  { //GET Single Item
    //
    method  : 'GET',
    name    : 'users/check_availability/:property/:vallue',
    handler : userController.checkAvailability
  },
  {
    method  : 'GET',
    name    : 'users/:id',
    handler : userController.getSingle
  },
  {
    //CREATE a new Item
    method  : 'POST',
    name    : 'users/signup',
    handler : userController.register
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
    handler : userController.attemptLogin
  },
  {
    //UPDATE the fields in a particular Item
    method  : 'PUT',
    name    : 'users/:id',
    handler : userController.edit
  },
  {
    //DELETE Item from db
    method  : 'DELETE',
    name    : 'users/:id',
    handler : userController.delete
  }
];




//Export an array with the route Group Name and the routes
module.exports = routes;



const book = require('../../../models/Book');
const upload = require('../../../lib/helpers').upload;
const checkAuth = require('../../middleware/check-auth');
const bookControllers = require('../../controllers/bookControllers');

let routes = [
  { //GET Single Item
    method  : 'GET',
    name    : 'books',
    handler : bookControllers.getAll
  },
  {
    method  : 'GET',
    name    : 'books/:id',
    handler : bookControllers.getSingle
  },
  {
    //CREATE a new Item
    method  : 'POST',
    name    : 'books',
    //TODO Add CheckAuth middleware
    handler : [upload({
                        destination : 'uploads/products',
                        optional : true,
                        mimeTypes : ['image/png', 'image/jpeg', "image/gif"] })
                 .single('book_pic'), bookControllers.create]
  },
  {
    //UPDATE the fields in a particular Item
    method  : 'PUT',
    name    : 'books/:id',
    //TODO Add CheckAuth middleware
    handler : bookControllers.edit
  },
  {
    //DELETE Item from db
    method  : 'DELETE',
    name    : 'books/:id',
    //TODO Add CheckAuth middleware
    handler : bookControllers.delete
  }
];

//Export an array with the route Group Name and the routes
module.exports = routes;



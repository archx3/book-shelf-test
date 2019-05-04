const express = require('express');
const router = express.Router();
//const lodash = require('lodash');
const passport = require('passport');
const Book = require('../../models/Book');
let title = "Book Ave.";
let userController = require('../controllers/userControllers');

function getQ(req)
{
  return req.query.q ? req.query.q : "";
}

let routeGroups = {
  authRoutes : [
    { //GET Single Item
      method  : 'GET',
      name    : 'google',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        // TODO handle with passport
        res.send("logging in w/ goog");
      }
    },
    {
      //login user a new Item
      method  : 'GET',
      name    : 'logout',
      handler : userController.logout
    }
  ]
};

for (let routeGroup in routeGroups)
{
  //ADD on all the available routes from the routeGroup array
  routeGroups[routeGroup].forEach(function (route)
                                  {
                                    let method = route.method.toLowerCase();

                                    if (typeof router[method] === 'function')
                                    { // the route handler callback could be one function only or an array of functions
                                      router[route.method.toLowerCase()](`/${route.name}`, route.handler);
                                    }
                                    else {console.log(`route with properties ${route} cannot be created`);}
                                  });
}

module.exports = router;

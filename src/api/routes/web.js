const express = require('express');
const router = express.Router();
//const lodash = require('lodash');
let routeGroups = {
  webRoutes : [
    { //GET Single Item
      method  : 'GET',
      name    : '/',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: 'Express' });
      }
    },
    { //GET Single Item
      method  : 'GET',
      name    : '/login',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: 'Express' });
      }
    },
    { //GET Single Item
      method  : 'GET',
      name    : '/logout',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: 'Express' });
      }
    },
    { //GET Single Item
      method  : 'GET',
      name    : '/books',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: 'Express' });
      }
    },
    { //GET Single Item
      method  : 'GET',
      name    : '/book:id',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: 'Express' });
      }
    },
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

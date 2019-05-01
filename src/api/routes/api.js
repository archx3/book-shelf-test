const express = require('express');
const router = express.Router();
//const lodash = require('lodash');
let routeGroups = {
  books : require('./api/books'),
  orders : require('./api/orders'),
  users : require('./api/users'),
};

for (let routeGroup in routeGroups)
{
  //ADD on all the available routes from the routeGroup array
  routeGroups[routeGroup].forEach(function (route, i)
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

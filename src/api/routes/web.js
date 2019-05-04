const express = require('express');
const router = express.Router();
//const lodash = require('lodash');
const Book = require('../../models/Book');
let title = "Book Ave.";
const passport = require('passport');
const GoogleStra = require('passport-google-oauth2');

function getQ(req)
{
  return req.query.q ? req.query.q : "";
}

let routeGroups = {
  webRoutes : [
    { //GET Single Item
      method  : 'GET',
      name    : '/',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        Book.find().then(function (books)
                         {
                           res.status(200)
                              .render('index', {
                                title: title,
                                books : books,
                                sq : getQ(req),
                                authenticated : req.isAuthenticated()
                              });
                         });
      }
    },
    { //GET Single Item
      method  : 'GET',
      name    : '/dashboard',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        Book.find().then(function (books)
                         {
                           res.status(200)
                              .render('index', {
                                title: title,
                                books : books,
                                sq : getQ(req),
                                authenticated : req.isAuthenticated()
                              });
                         });
      }
    },
    { //GET Login
      method  : 'GET',
      name    : 'login',
      // handler can be a single function or an array of functions
      handler : function(req, res, next)
      {
        if (req.isAuthenticated()) {
          res.redirect('/dashboard');
        }
        else
        {
          res.render('login', { title : title });
        }
      }
    },
    { //Login
      method  : 'GET',
      name    : 'register',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('register', { title: title, sq : getQ(req) });
      }
    },
    { //Login
      method  : 'GET',
      name    : 'add-book',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('add-book', { title: title, sq : getQ(req) });
      }
    },
    { //Logout
      method  : 'GET',
      name    : 'logout',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: title });
      }
    },
    { //GET all books
      method  : 'GET',
      name    : 'books',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        if(!req.query.q){
          res.redirect(301, "/")
        }

        var re = new RegExp(req.query.q, 'i');
        Book.find()
            .or([{ 'title' : { $regex : re } }, { 'genre' : { $regex : re } }])
            .sort('title')
            .exec(function (err, books)
                  {
                    res.status(200)
                       .render('books', {
                         title: title,
                         books : books,
                         sq : getQ(req) });
                  });
      }
    },
    { //GET Single book
      method  : 'GET',
      name    : 'book:id',
      // handler can be a single function or an array of functions
      handler : function(req, res, next) {
        res.render('index', { title: title });
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

/* globals requirejs:true */
requirejs.config({
  paths: {
    'jquery': "libs/jquery-2.0.2.min",
    'bootstrap': "libs/bootstrap.min",
    'knockout': "libs/knockout-2.2.1",
    'handlebars': "libs/handlebars"
  },
  shim: {
    'bootstrap': {
       deps: ['jquery']
    }
  }
});

define(['require'], function (require) {
  require(['jquery', 'bootstrap']);
});
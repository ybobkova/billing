var steps = function (expect) {

  this.logInHerrMueller = function() {
    this.visitPage('/', function() {
      world.browser.log(this.browser.html());
    });
    var $field_name = world.css('input[name="_username"]').exists().get();
    world.util.fill($field_name, 'herrmueller');
    var $field_pass = world.css('input[name="_password"]').exists().get();
    world.util.fill($field_pass, 'secret123');
    this.util.pressButton('Sign in');
  };


  this.Given(/^the user is not logged in$/, function(callback) {
    callback();
  });

  this.Given(/^the user is logged in from the main page$/, function(callback) {
    this.logInHerrMueller();
    callback();
  });
};

module.exports = steps;
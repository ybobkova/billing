var steps = function () {

  this.Given(/^there is a user in system with the Nickname "([^"]*)" and Password "([^"]*)"$/, function(arg1, arg2, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user fills "([^"]*)" in the nickname\-field$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user fills "([^"]*)" in the password\-field$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^the presses the "([^"]*)"\-Button$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the user must be logged in$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the user should see the clints\.html page$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^there is no user in system with the Nickname "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the user must see the label "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });
};

module.exports = steps;
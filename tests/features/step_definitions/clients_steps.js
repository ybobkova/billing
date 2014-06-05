var steps = function () {

  this.Given(/^there is no customer with name "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user fills "([^"]*)" in the customer\-field$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^the user presses the "([^"]*)"\-Button$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the customer must be seen in the customers\-table$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^there is a customer with name "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the customer should see a label "([^"]*)"$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^no changes appear in the customers\-table$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^there are customers with names "([^"]*)", "([^"]*)", "([^"]*)", "([^"]*)"$/, function(arg1, arg2, arg3, arg4, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^the user presses the search\-Button$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^only the customers "([^"]*)" and "([^"]*)" should be seen in the customers\-table$/, function(arg1, arg2, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^there is a customer with name "([^"]*)" in the table$/, function(arg1, callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user presses the trash\-button$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^the customer should be deleted from the customers\-table$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user presses the cog\-button in the row of this customer$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^a modal should be opened, where the infos about the customer can be edited$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Given(/^the user presses the row of this customer$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^a page with projects should be opened$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });
};

module.exports = steps;
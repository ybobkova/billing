var steps = function () {

  this.Given(/^there is a user in system with the Nickname "([^"]*)" and Password "([^"]*)"$/, function(nick, password, callback) {
    callback();
  });
};

module.exports = steps;
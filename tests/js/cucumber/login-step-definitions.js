var steps = function () {

  this.Given(/^the user is not logged in$/, function(callback) {
    callback();
  });
};

module.exports = steps;
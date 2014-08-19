var steps = function (expect, commons) {

  commons.loginAs = function(username, password, callback) {
    var world = this;

    world.browser.authenticate().basic('herrmueller', 'secret123');

    // can have different id if fixture parts are loaded!
    world.executeDQL(
      'SELECT user FROM Clieman\\Entities\\User as user WHERE user.username = :name ',
      { name: username },
      function(result) {
        expect(result).to.have.length(1);

        world.userId = result[0].id;
      },
      callback
    );
  };

  this.Given(/^the user is not logged in$/, function(callback) {
    callback();
  });

  this.Given(/^the user is logged in$/, function(callback) {
    commons.loginAs.call(this, 'herrmueller', 'secret123', callback);
  });
};

module.exports = steps;
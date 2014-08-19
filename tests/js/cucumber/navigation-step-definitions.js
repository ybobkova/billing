module.exports = function(expect, commons) {

  commons.goTo = function(location) {
    var world = this;

    var urls = {
      home: '/',
      clients: '/clients',
      login: '/login'
    };

    expect(urls).to.have.property(location);

    var url = urls[location];

    world.visitPage(url, function() {
      world.browser.log(world.browser.html());
    });
  };

  this.Given(/^the user is at the page "([^"]*)"$/, function(location, callback) {
    commons.goTo.call(this, location);
    callback();
  });
};
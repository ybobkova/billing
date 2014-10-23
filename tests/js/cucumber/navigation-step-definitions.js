module.exports = function(expect, commons) {

  commons.goTo = function(location) {
    var world = this;

    var urls = {
      home: '/',
      clients: '/clients',
      login: '/login',
      threeFattiesProjects: '/clients/1/projects'
    };

    expect(urls).to.have.property(location);

    var url = urls[location];

    world.visitPage(url, function() {
      world.browser.log(world.browser.html());
    });
  };

  commons.wait = function(msec, callback) {
    setTimeout(function() {
      callback();
    }, msec);
  };

  this.Given(/^the user is at the page "([^"]*)"$/, function(location, callback) {
    commons.goTo.call(this, location);
    commons.wait.call(this, 6000, callback);
  });

  this.Given(/^the user is at the page "projects" of the client "Three Fatties"$/, function(callback) {
    commons.goTo.call(this, 'threeFattiesProjects');
    commons.wait.call(this, 6000, callback);
  });
};
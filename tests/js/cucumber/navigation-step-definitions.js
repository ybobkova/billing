module.exports = function(expect) {

  this.Given(/^the user is at the page "([^"]*)"$/, function(location, callback) {
    var world = this;
    var urls = {
      home: '/',
      clients: '/clients'
    };

    expect(urls).to.have.property(location);

    var url = urls[location];

    this.visitPage(url, function() {
      this.browser.log(this.browser.html());
    });

    callback();
  });
};
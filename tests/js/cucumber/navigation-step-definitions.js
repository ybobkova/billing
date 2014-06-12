module.exports = function(expect) {

  this.Given(/^the user is at the page "([^"]*)"$/, function(location, callback) {
    var urls = {
      home: '/'
    };

    expect(urls).to.have.property(location);

    var url = urls[location];

    this.visitPage(url, function() {
      console.log(this.browser.html());
      callback();
    });
  });
}
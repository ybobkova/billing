var steps = function (expect) {

  this.Given(/^the fixture parts:$/, function(string, callback) {
    this.loadFixtureParts(string, callback);
  });
};

module.exports = steps;
module.exports = function(expect) {
  var fillIn = function(world, field, value, callback) {
    var $field = world.css('input[name="'+ field + '"]').exists().get();
    world.util.fill($field, value, callback);
  };

  this.When(/^the user fills "([^"]*)" in the "([^"]*)"\-field$/, function(value, field, callback, withCSS) {
    fillIn(this, field, value, callback);
  });

  this.When(/^the user presses the "([^"]*)"\-Button$/, function(button_name, callback, withCSS) {
    this.util.pressButton(button_name, callback);
  });

  this.Then(/^the user sees the headline "([^"]*)"$/, function(headline, callback, withCSS) {
    this.css('h1:contains("' + headline + '")').exists();
    callback();
  });

  this.When(/^the user fills in a wrong username in the "([^"]*)"\-field$/, function(field, callback) {
    fillIn(this, field, "areallywrongvalue", callback);
  });

  this.Then(/^the user must see the label "([^"]*)"$/, function(label, callback, withCSS) {
    this.css('body:contains("' + label + '")').exists();
    callback();
  });

  this.Given(/^there is no customer with name "([^"]*)"$/, function(company, callback) {
    var count = this.css('td:contains("' + company + '")');
    expectElement(count).to.equal(0);
    callback();
});
};
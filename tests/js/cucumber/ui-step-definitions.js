module.exports = function(expect, commons) {
  commons.fillIn = function(field, value, callback) {
    var world = this;
    var $field = world.css('input[name="'+ field + '"]').exists().get();
    world.util.fill($field, value, callback);
  };

  this.When(/^the user fills "([^"]*)" in the "([^"]*)"\-field$/, function(value, field, callback, withCSS) {
    commons.fillIn.call(this, field, value, callback);
  });

  this.When(/^the user presses the "([^"]*)"\-Button$/, function(button_name, callback, withCSS) {
    this.util.pressButton(button_name, callback);
  });

  this.Then(/^the user sees the headline "([^"]*)"$/, function(headline, callback, withCSS) {
    this.css('h1:contains("' + headline + '")').exists();
    callback();
  });

  this.When(/^the user fills a wrong value in the "([^"]*)"\-field$/, function(field, callback, withCSS) {
    commons.fillIn.call(this, field, "areallywrongvalue", callback);
  });

  this.Then(/^the user must see the label "([^"]*)"$/, function(label, callback, withCSS) {
    this.css('body:contains("' + label + '")').exists();
    callback();
  });

  this.Given(/^"([^"]*)" must be seen in the last row of the "([^"]*)"\-table$/, function(entry, table, callback, withCSS) {
    this.css('table[name='+table+']').exists().css('tr:last-child td:last-child:contains("'+entry+'")').count(1);
    callback();
  });
};
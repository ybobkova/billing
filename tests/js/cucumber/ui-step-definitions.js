module.exports = function(expect, commons) {
  var that = this;

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

  this.Given(/^"([^"]*)" must be seen in the "([^"]*)"\-table$/, function(entry, table, callback, withCSS) {
    this.css('table[name=' + table + '] tr td:first-child:contains("' + entry + '")').count(1);
    callback();
  });

  this.Then(/^no changes appear in the "([^"]*)"\-table$/, function(table, callback, withCSS) {
    this.css('table[name=' + table + '] tbody tr').count(5);
    callback();
  });

  this.Then(/^only the clients with "([^"]*)" in name should be seen in the "([^"]*)"\-table$/, function(name, table, callback, withCSS) {
    var lines_num = this.css('table[name=' + table + '] tbody tr').exists().get().length;
    this.css('table[name=' + table + '] tbody tr td:first-child:contains("' + name + '")').count(lines_num);
    callback();
  });

  this.Given(/^the user presses the "([^"]*)"-button in the row "([^"]*)" in the "([^"]*)"\-table$/, function(button_id, row, table, callback, withCSS) {
    $button = this.css('table[name=' + table + '] tbody tr:has(td:contains("' + row + '")) button[id=' + button_id + ']').exists().get();
    this.util.pressButton($button, callback);
  });

  this.Then(/^the row "([^"]*)" should disappear from the "([^"]*)"\-table$/, function(client, table, callback, withCSS) {
    this.css('table[name=' + table + '] tbody tr:has(td:first-child:contains("' + client + '"))').count(0);
    callback();
  });

  this.Then(/^the row "([^"]*)" should appear in the "([^"]*)"\-table$/, function(client, table, callback, withCSS) {
    this.css('table[name=' + table + '] tbody tr:has(td:first-child:contains("' + client + '"))').count(1);
    callback();
  });

  this.Then(/^a modal "([^"]*)" should be opened$/, function(title, callback, withCSS) {
    this.css('h4:contains("' + title + '")').exists();
    callback();
  });

  this.Then(/^a modal "([^"]*)" should be closed$/, function(title, callback, withCSS) {
    this.css('.modal').is(":not(:visible)");
    callback();
  });

  this.Given(/^the user presses the name "([^"]*)" in the "([^"]*)"-table$/, function(name, table, callback, withCSS) {
    $row = this.css('table[name=' + table + '] tbody tr td:first-child:contains("' + name + '")').exists().get();
    this.util.clickLink($row, callback);
  });
};
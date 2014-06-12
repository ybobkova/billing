module.exports = function(expect) {
  this.When(/^the user fills "([^"]*)" in the "([^"]*)"\-field$/, function(value, field, callback, withCSS) {
    var $field = this.css('input[name="'+ field + '"]').exists().get();

    this.util.fill($field, value, callback);
    //this.browser.fill($field.get(0), value);
  });
}

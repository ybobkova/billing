define('clients', ['knockout', 'jquery', 'KnockoutSync/Backend', 'KnockoutSync/EntityModel', 'KnockoutSync/jQueryAjaxDriver', 'knockout-mapping'],
  function(ko, $, Backend, EntityModel, jQueryAjaxDriver, km) {

  var emptyModel = new EntityModel({entities: []});
  var driver = new jQueryAjaxDriver();
  var backend = new Backend(driver, emptyModel);
  var that = this;

  var clientsViewModel = function () {
    this.client_name = '';

    var clientsMapping = {
      'clients': {
        key: function(data) {
          return ko.utils.unwrapObservable(data.id);
        }
      }
    };

    km.fromJS({clients:[]}, clientsMapping, this);
    that.updateModel();

    this.addClient = function() {
      console.log(this.client_name);
      backend.dispatchRequest('POST', 'clients', {name: this.client_name}, [200], function(failure, result) {});
      that.updateModel();
      console.log(clientsViewModel);
    };

    this.removeClient = function() {
      console.log('remove client');
    };
  };

  this.updateModel = function () {
    backend.dispatchRequest('GET', 'clients', undefined, [200], function(failure, result) {
      km.fromJS(result, clients);
    });
  };

  var clients = new clientsViewModel();
  ko.applyBindings(clients);

  jQuery(document).ready(function($) {
    $(".clickableRow")
      .click(function() {
        window.document.location = $(this).attr("href");
      });
  });
});
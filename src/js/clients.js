define('clients', ['knockout', 'jquery', 'KnockoutSync/Backend', 'KnockoutSync/EntityModel', 'KnockoutSync/jQueryAjaxDriver', 'knockout-mapping', 'JSON','knockout-projections'],
  function(ko, $, Backend, EntityModel, jQueryAjaxDriver, km) {

  var emptyModel = new EntityModel({entities: []});
  var driver = new jQueryAjaxDriver();
  var backend = new Backend(driver, emptyModel);
  var that = this;

  var clientsViewModel = function () {
    var self = this;
    self.new_name = ko.observable('');
    self.search_name = ko.observable('');

    self.edit_name = ko.observable('');

    var clientsMapping = {
      'clients': {
        key: function(data) {
          return ko.utils.unwrapObservable(data.id);
        }
      }
    };

    km.fromJS({clients:[]}, clientsMapping, this);
    that.updateModel();

    self.addClient = function() {
      backend.dispatchRequest('POST', 'clients', {name: self.new_name()}, [204], function(failure) {
        self.new_name('');
        if (!failure) {
          that.updateModel();
        } else {
          console.log(failure);
        }
      });
    };

    self.removeClient = function(client) {
      backend.dispatchRequest('DELETE', 'clients/' + client.id(), undefined, [204], function(failure) {
        if (!failure) {
          that.updateModel();
        }
      });
    };

    self.nullValues = function() {
      self.edit_name('');
    };

    self.copyValues = function(client) {
      self.edit_name(client.name());
      self.active_id = client.id();
    };

    self.editClient = function() {
      backend.dispatchRequest('PUT', 'clients/' + self.active_id, {name: self.edit_name()}, [204], function(failure) {
        self.nullValues();
        if (!failure) {
          that.updateModel();
        } else {
          console.log(failure);
        }
      });
    };

    self.filteredClients = ko.dependentObservable(function() {
      var filter = self.search_name().toLowerCase();
      if (!filter || filter === '') {
        return self.clients();
      } else {
        return ko.utils.arrayFilter(self.clients(), function(client) {
          return (client.name().toLowerCase().indexOf(filter) > -1);
        });
      }
    }, self.clients);

    self.openProjects = function(client) {
      var id = client.id();
      window.document.location = 'clients/' + id + '/projects';
    };

  };

  this.updateModel = function () {
    backend.dispatchRequest('GET', 'clients', undefined, [200], function(failure, result) {
      km.fromJS(result, clients);
    });
  };

  var clients = new clientsViewModel();
  ko.applyBindings(clients);
});
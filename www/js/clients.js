define(['knockout'], function(ko) {

  function Client(name, id) {
    var self = this;
    self.name = name;
    self.id = id;
  }

  function ClientsViewModel() {
    var self = this;
    self.clients = ko.observableArray([]);
    self.client_name = ko.observable();
    self.id = 0;

    self.addClient = function() {
      if (self.client_name() != "") {
        self.clients.push(new Client(self.client_name(), self.id++));
        self.client_name("");
      }
    }

    self.removeClient = function(client) {
        self.clients.remove(client);
    }
  }

  ko.applyBindings(new ClientsViewModel());
});
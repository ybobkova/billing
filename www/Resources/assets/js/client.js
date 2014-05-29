define('client', ['knockout', 'jquery'], function(ko, $) {

  function Client(id, name, index, street, house, place) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
  }

  function ClientsViewModel() {
    var self = this;
    self.id = 1;
    self.client_name = ko.observable("");

    self.clients = ko.observableArray([
      new Client(self.id++, "Bazinga"),
      new Client(self.id++, "Three Fatties")
    ]);

    self.addClient = function() {
      if (self.client_name() != "") {
        self.clients.push(new Client(self.id++, self.client_name()));
        self.client_name("");
      }
    }

    self.removeClient = function(client) {
        self.clients.remove(client);
    }
  }

  ko.applyBindings(new ClientsViewModel());

  jQuery(document).ready(function($) {
    $(".clickableRow")
      .click(function() {
        window.document.location = $(this).attr("href");
      });
  });
});
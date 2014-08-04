define('project', ['knockout', 'jquery'], function(ko, $) {

  function Project(name, contact_person, date, email, postIndex, street, house, place, offer) {
    var self = this;
    self.name = ko.observable(name);
    self.contact_person = ko.observable(contact_person);
    self.date = ko.observable(date);
    self.email = ko.observable(email);
    self.offer = ko.observable(offer);
  }

  function ProjectsViewModel() {
    var self = this;
    self.project_name = ko.observable("");
    self.contact_person = ko.observable("");
    self.date = ko.observable("");
    self.email = ko.observable("");
    self.activeIndex = ko.observable("");

    self.projects = ko.observableArray([        
      new Project("Baustelle", "Anna Kirchberg", "2014-05-15", "Anna.Kirchberg@Ravensburger.de"), 
      new Project("Pferde", "Edita", "2014-05-15", "Edita@Ravensburger.de"),
      new Project("Disney", "Walt Disney", "2014-05-92", "WD@D.de")
    ]);

    self.addProject = function() {
      if (self.project_name() != "") {
        self.projects.push(new Project(self.project_name(), self.contact_person(), self.date(), self.email()));
        self.nullValues();
      }
    };

    self.changeProject = function() {
      self.projects.replace(self.projects()[self.activeIndex()], 
        new Project(self.project_name(), self.contact_person(), self.date(), self.email()));
      self.nullValues();
    };

    self.removeProject = function(project) {
      self.projects.remove(project);
    };

    self.nullValues = function() {
      console.log("nulllll");
      self.project_name("");
      self.contact_person("");
      self.date("");
      self.email("");
    };

    self.copyValues = function(project) {
      self.project_name(project.name());
      self.contact_person(project.contact_person());
      self.date(project.date());
      self.email(project.email());
      self.activeIndex(self.projects.indexOf(project));
    };

/*    self.isCreated = ko.computed(function(project) {
      if (project.offer()) {
        return "Angebot bearbeiten"
      } else {
        return "Angebot erstellen"
      }
    });*/
  }

  ko.applyBindings(new ProjectsViewModel());

  /*jQuery(document).ready(function($) {
    $(".clickableRow:not(:trash_button)")
      .click(function() {
        window.document.location = $(this).attr("href");
      });
  });*/
 
/*  jQuery(document).ready(function($) {
    if (project.offer) {
      $("#btnoffer").prop('value', 'Angebot bearbeiten');
    } else {
      $("#btnoffer").prop('value', 'Angebot erstellen');
    }
  });*/
});
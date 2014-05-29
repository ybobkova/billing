Feature: Projects

  Scenario: Create new project modal opens
    When the user presses the button "Neues Projekt anlegen"
    Then the modal with empty form should be open

  Scenario: Create new project modal closes
    When the user presses the button "x"
    Then the modal should be closed without saving

  Scenario: Successful creation of a new project
    Given there is no project named "Project"
    When the user writes "Project" in the "Name vom Projekt"-field
    And he presses the button "Erstellen"
    Then the modal should be closed
    And the new project should be seen in the table

  Scenario: There is already a project with this name
    Given there is a project named "Project"
    When the user writes "Project" in the "Name vom Projekt"-field
    And he presses the button "Erstellen"
    Then the User should see a label "Es gibt einen Peojekt mit diesem Namen"
    And no changes take place in the table

  Scenario: Delete Project
    Given there is a project with name "Project" in the table
    And the user presses the trash-button
    Then the project should be deleted from the table

  Scenario: Edit Project
    Given there is a project with name "Project" in the table
    And the user presses the cog-button in the row of this project
    Then a modal should be opened, where the infos about the project can be edited

  Scenario: There is an offer
    Given there is a project with name "Project" in the table
    Given there is an offer to this project
    Then the name of the button should be "Angebot ändern"

  Scenario: There is no offer
    Given there is a project with name "Project" in the table
    Given there is no offer to this project
    Then the name of the button should be "Angebot erstellen"

  Scenario: "Create an offer"-modal opens
    Given the users name, address, bank accout are known
    And the users name and contact data are known
    When the user presses the button "Angebot erstellen"
    Then the modal with he form should be open
    And the customer-fields should be filled
    And the actual date-field should be filled
    And the user-fields should be filled
    And the name of the button should be "Erstellen"

  Scenario: "Change an offer"-modal opens
    When the user presses the button "Angebot ändern"
    Then the modal with he form should be open
    And the form should be filled with the information, saved in this offer
    And the name of the button should be "Speichern"

  Scenario: Create a new offer
    When the user presses the button "Erstellen"
    Then the offer should be saved
    And the button in the table should change to "Angebot ändern"

  Scenario: Creare/change offer modal closes
    When the user presses the button "x"
    Then the modal should be closed without saving

  Scenario: Change an offer
    When the user presses the button "Speichern"
    Then the offer should be saved
  
  Scenario: Send an offer
    When the user presses the button "Absenden"
    Then the modal with the form should be closed
    And the offer should be saved
    And the user should see a label "Das Angebot wurde abgesendet"
    And the offer should be sent to the email, saved in the form
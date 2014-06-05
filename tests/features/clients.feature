Feature: Customers

  Background:
    The user is logged in as administrator or as user
    The user is at the page clients.html

  Scenario: Create new customer
    Given there is no customer with name "Client"
    And the user fills "Client" in the customer-field
    When the user presses the "Neuen Kunden anlegen"-Button
    Then the customer must be seen in the customers-table

  Scenario: There is already a customer with this name
    Given there is a customer with name "Client"
    And the user fills "Client" in the customer-field
    When the user presses the "Neuen Kunden anlegen"-Button
    Then the customer should see a label "Es gibt einen Kunden mit diesem Namen"
    And no changes appear in the customers-table

  Scenario: Search
    Given there are customers with names "Client_1", "Client_2", "Another_1", "Another_2" 
    And the user fills "Client" in the customer-field
    When the user presses the search-Button
    Then only the customers "Client_1" and "Client_2" should be seen in the customers-table

  Scenario: Delete Customer
    Given there is a customer with name "Client" in the table
    And the user presses the trash-button
    Then the customer should be deleted from the customers-table

  Scenario: Edit Customer
    Given there is a customer with name "Client" in the table
    And the user presses the cog-button in the row of this customer
    Then a modal should be opened, where the infos about the customer can be edited

  Scenario: See Projects
    Given there is a customer with name "Client" in the table
    And the user presses the row of this customer
    Then a page with projects should be opened
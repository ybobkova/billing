Feature: Clients

  Background:
    Given the fixture parts:
    """
    alice: user.mueller
    """
    Given the user is logged in
    And the user is at the page "clients"

  Scenario: Create a new client
    When the user fills "Blue Skyes GmbH" in the "new_client"-field
    And the user presses the "Neuen Kunden anlegen"-Button
    Then "Blue Skyes GmbH" must be seen in the "clients"-table
  
  Scenario: There is already a client with this name
    When the user fills "Blue Skyes GmbH" in the "new_client"-field
    And the user presses the "Neuen Kunden anlegen"-Button
    And the user fills "Blue Skyes GmbH" in the "new_client"-field
    And the user presses the "Neuen Kunden anlegen"-Button
    #Then the user must see the label "Es gibt einen Kunden mit diesem Namen"
    Then no changes appear in the "clients"-table

  Scenario: Search
   And the user fills "pizza" in the "find_clients"-field
   Then only the clients with "Pizza" in name should be seen in the "clients"-table

  Scenario: Delete a Client
   And the user presses the "remove"-button in the row "Pizza Esser" in the "clients"-table
   Then the row "Pizza Esser" should disappear from the "clients"-table

  Scenario: See Projects
    And the user presses the name "Pizza Backer" in the "clients"-table
    Then the user sees the headline "Pizza Backer: Projekte"

  Scenario: Open Client-Modal
    Given the user presses the "edit"-button in the row "Pizza Backer" in the "clients"-table
    Then a modal "Kundendaten bearbeiten" should be opened

  Scenario: Edit a Client
    Given the user presses the "edit"-button in the row "Pizza Backer" in the "clients"-table
    And the user fills "Brot Backer" in the "name"-field
    And the user presses the "Speichern"-Button
    Then a modal "Kundendaten bearbeiten" should be closed
    Then the row "Pizza Backer" should disappear from the "clients"-table
    Then the row "Brot Backer" should appear in the "clients"-table

# new scenarios:
#
# edit customer and fill in the existing name -> see label "this name already exists"
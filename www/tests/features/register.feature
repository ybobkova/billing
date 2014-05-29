Feature: Register

  Scenario: Successful registration
    Given there is no user in system with the Nickname "User"
    And the user types "User" in the "Benutzername"-field
    And the user fills every other field
    And the user fills the fields "Passwort" and "Passwort wiederholen" identically
    And the user checks the Box "Ich akzeptiere"
    When the presses the "Registrieren"-Button
    Then the user must be logged in
    And the user should see the Tour-page

  Scenario: the Username is already taken
    Given there is a user in system with the Nickname "User"
    And the user types "User" in the nickname-field
    And the user fills every other field
    When the user presses the "Registrieren"-Button
    Then the user must see the label "Der Benutzername ist schon vergeben"    

  Scenario: Wrong confirmed Password
    Given there is no user in system with the Nickname "User"
    And the user types "User" in the "Benutzername"-field
    And the user fills every other field
    And the user fills the fields "Passwort" and "Passwort wiederholen" not identically
    And the user checks the Box "Ich akzeptiere"
    When he presses the "Registrieren"-Button
    Then the field "Passwort" should be made empty
    Then the field "Passwort wiederholen" should be made empty
    Then the user must see the label "Überprüfen Sie bitte Ihr Passwort" 

  Scenario: User doesn't agree
    Given there is no user in system with the Nickname "User"
    And the user types "User" in the "Benutzername"-field
    And the user fills every other field
    And the user fills the fields "Passwort" and "Passwort wiederholen" identically
    And the user doesn't check the Box "Ich akzeptiere"
    When he presses the "Registrieren"-Button
    Then the user must see the label "Sie müssen die Bedingungen akzeprieren, um sich registrieren zu können"

  Scenario: User doesn't fill one of the obligatory fields
    Given there is no user in system with the Nickname "User"
    And the user types "User" in the "Benutzername"-field
    And the user fills the fields "Passwort" and "Passwort wiederholen" identically
    And the user doesn't check the Box "Ich akzeptiere"
    And the user doesn't fill the "Vorname" - field
    When he presses the "Registrieren"-Button
    Then the user must see the label "Füllen Sie bitte alle Felder aus"

  Scenario: User wants to sing in
    When the user presses the "Sign in"-Button
    Then the user should see the login-page
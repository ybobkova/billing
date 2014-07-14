Feature: Log in

  Background:
    Given there is a user in system with the Nickname "HerrMüller" and Password "secret123"
    And the user is not logged in
    And the user is at the page "home"

  Scenario: Successful log in
    When the user fills "HerrMüller" in the "email"-field
    And the user fills "secret123" in the "password"-field
    And the user presses the "Sign in"-Button
    Then the user sees the headline "Kunden verwalten"

  Scenario: No such Username
    When the user fills in a wrong username in the "email"-field
    And the user fills "Password" in the "password"-field
    When the user presses the "Sign in"-Button
    Then the user must see the label "No such Username"

#  Scenario: Wrong Password
#    Given there is a user in system with the Nickname "User" and Password "Password"
#    And the user fills "User" in the "email"-field
#    And the user fills "Passworddd" in the "password"-field
#    When the user presses the "Sign in"-Button
#    Then the user must see the label "Wrong Password"
Feature: Log in

  Background:
    Given the user is not logged in
    And the user is at the page "home"

  Scenario: Successful log in
   # Given there is a user in system with the Nickname "User" and Password "Password"
    When the user fills "User" in the "email"-field
    And the user fills "Password" in the "password"-field
    And the user presses the "Sign in"-Button
    Then the user should see the "clients" page

  Scenario: No such Username
    Given there is no user in system with the Nickname "User"
    And the user fills "User" in the "email"-field
    And the user fills "Password" in the "password"-field
    When the presses the "Sign in"-Button
    Then the user must see the label "No such Username"

  Scenario: Wrong Password
    Given there is a user in system with the Nickname "User" and Password "Password"
    And the user fills "User" in the "email"-field
    And the user fills "Passworddd" in the "password"-field
    When the presses the "Sign in"-Button
    Then the user must see the label "Wrong Password"
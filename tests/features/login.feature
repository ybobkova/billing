Feature: Log in

  Background:
    The user is not logged in
    The user is at the page index.html

  Scenario: Successful log in
    Given there is a user in system with the Nickname "User" and Password "Password"
    And the user fills "User" in the nickname-field
    And the user fills "Password" in the password-field
    When the presses the "Sign in"-Button
    Then the user must be logged in
    And the user should see the clints.html page

  Scenario: No such Username
    Given there is no user in system with the Nickname "User"
    And the user fills "User" in the nickname-field
    And the user fills "Password" in the password-field
    When the presses the "Sign in"-Button
    Then the user must see the label "No such Username"    

  Scenario: Wrong Password
    Given there is a user in system with the Nickname "User" and Password "Password"
    And the user fills "User" in the nickname-field
    And the user fills "Passworddd" in the password-field
    When the presses the "Sign in"-Button
    Then the user must see the label "Wrong Password"
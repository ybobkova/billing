Feature: Log in

  Background:
    Given the fixture parts:
    """
    alice: user.mueller
    """
    And the user is not logged in
    And the user is at the page "home"

  Scenario: Successful log in
    When the user fills "herrmueller" in the "_username"-field
    And the user fills "secret123" in the "_password"-field
    And the user presses the "Sign in"-Button
    Then the user sees the headline "Kunden verwalten"

  Scenario: No such Username
    When the user fills in a wrong username in the "_username"-field
    And the user fills "Password" in the "_password"-field
    When the user presses the "Sign in"-Button
    Then the user must see the label "Invalid username or password"

  Scenario: Wrong Password
    When the user fills "herrmueller" in the "_username"-field
    And the user fills "secret12345" in the "_password"-field
    When the user presses the "Sign in"-Button
    Then the user must see the label "Invalid username or password"
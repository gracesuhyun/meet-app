Feature: Show/hide event details

Scenario: An event element is collapsed by default
    Given the user hasn't opened the app yet
    When the user opens the app
    Then the events should be collapsed by default

Scenario: User can expand an event to see details
    Given the user is interested in an event
    When the user clicks on the "show details" button on an event
    Then the user should see the fully expanded details of the event

Scenario: User can collapse an event to hide its details
    Given the user is not interested in an event that has been expanded
    When the user clicks on the "hide details" button on an event
    Then the event box should collapse
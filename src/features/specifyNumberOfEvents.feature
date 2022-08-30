Feature: Specify number of events

Scenario: When user hasn't specified a number, 20 is the default number
    Given the user opens the app
    When the user doesn't specify how any events to view per page
    Then the user should only see 20 events at once

Scenario: User can change the number of events they want to see
    Given the user opens the app and wants to see more or fewer events in the list
    When the user enters the desired number of events to view per page in the "number of events" textbox
    Then the default number of events per page should change to what the the user chose
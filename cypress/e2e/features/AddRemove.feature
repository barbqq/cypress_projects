Feature: Click add element

  Scenario: Removing button
#    Given I visit site main page
    And I click Add element button
    Then Delete button state should "be.visible"
    When I save delete button html as "html"
    And I click delete element button
    Then Delete button state should "not.exist"
    When I re-insert the saved delete button into #elements from "html"
    Then Delete button state should "be.visible"
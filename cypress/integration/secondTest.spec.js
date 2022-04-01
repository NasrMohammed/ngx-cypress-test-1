
/// <reference types="cypress" />

it.only("Test CAT", () => {
    cy.setCookie('wizauth', 'cladmin-nmohammed/asM4rcpUxptqrMY8tnvLTw==')
    cy.visit("https://msstate-nmohammed-qa.dev7.leepfrog.com/courseleaf")
    cy.contains('Course Import').click()
   // cy.get('.print').contains('Print Options').click()
})
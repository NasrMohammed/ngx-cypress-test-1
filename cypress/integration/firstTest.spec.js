/// <reference types="cypress" />

describe('Our test suite', () => {

    it('first test', () => {
        cy.visit("/")
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // by tag name
        cy.get('input')
        // by ID 
        cy.get('#inputEmail')
        // by class name
        cy.get('.input-full-width')
        // by attribute name
        cy.get('[placeholder]')
        // by attribute name and value 
        cy.get('[placeholder="email"]')
        // by class value 
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        // by tag name and attribute value 
        cy.get('input[placeholder="email"]')
        // by two different attributes
        cy.get('[placeholder="email"][type="email"]')
        // by tag name, attribute with value, class name
        cy.get('input[placeholder="email"]#inputEmail.input-full-width')
        // the most recommended way by cypress
        cy.get('[data-cy="inputEmail"]')
    })
  
})


/*
type of locaters:
cypress uses jquery selector engine 


*/`
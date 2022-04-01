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
        cy.get('[placeholder="Email"]')
        // by class value 
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        // by tag name and attribute value 
        cy.get('input[placeholder="Email"]')
        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')
        // by tag name, attribute with value, class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
        // the most recommended way by cypress
       // cy.get('[data-cy="inputEmail"]')
    })
  
})

describe('Our test suite', () => {

    it('second test', () => {
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signinButton"]')
        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    it('then and wrap methods', () => {
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', "Email")
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', "Password")

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', "Email address")
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', "Password")
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.be.equal('Email')
            expect(passwordLabelFirst).to.be.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                expect(emailLabelSecond).to.be.equal('Email address')

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        }) 
    })

    it.only("invoke command", () => {
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        // 1 
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2 
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })
        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'checked')
        .then(classValue => {
            expect(classValue).to.contain('checked')
        })
    })

    it.only('assert properity', () => {
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 17, 2022')
        })
    })
    
})


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

    it("invoke command", () => {
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

    it('assert properity', () => {

        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+ ' '+futureDay+', '+date.getFullYear()
            
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                   // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() 
                   selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() 
                }
            })
            return dateAssert
        } 
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(90)
         
            // cy.get('nb-calendar-day-picker').contains('13').click()
             cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
    })
    it('radio button', () => {
        cy.visit("/")
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
            cy.wrap(radioButton)
            .first()
            .check({force:true})
            .should('be.checked')

            cy.wrap(radioButton)
            .eq(1)
            .check({force:true})

        cy.wrap(radioButton)
        .eq(0)
        .should('not.be.checked')

        cy.wrap(radioButton)
            .eq(2)
            .should('be.disabled')
        })

     
    })

    it('check boxes', () => {
        cy.visit("/")
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        // cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').eq(0).check({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})
    })

    it('Lists and dropdowns', () => {
        cy.visit("/")

        // 1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        // 2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3 ) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })
    
    it('Web tables', () => {
        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })
        // 2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableTow => {
            cy.wrap(tableTow).find('[placeholder="First Name"]').type('Nasri')
            cy.wrap(tableTow).find('[placeholder="Last Name"]').type('Mohammed')
            cy.wrap(tableTow).find('[placeholder="Username"]').type('nasri')
            cy.wrap(tableTow).find('[placeholder="E-mail"]').type('nasralddenoshar@gmail.com')
            cy.wrap(tableTow).find('[placeholder="Age"]').type('99')

            cy.wrap(tableTow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Nasri')
            cy.wrap(tableColumns).eq(3).should('contain', 'Mohammed')
        })
        // 3
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
        })
})
        


    })

    it('tooltip', () => {
        cy.visit("/")
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('dialog box', () => {
        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.be.equal('Are you sure you want to delete?')
        // })
        // 2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub) 
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false) 

    })
   
})

describe('Tutorialspoint Test', function () {
    // test case
    it("Scenario 1", function () {
       //URL launch
       cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
       //handling prompt alert
       cy.window().then(function(p){
          //stubbing prompt window
          cy.stub(p, "prompt").returns("Tutorialspoint");
          // click on Click for JS Prompt button
          cy.get(':nth-child(3) > button').click()
          cy.wait(2000)
          // verify application message on clicking on OK
          cy.get('#result').contains('You entered: Tutorialspoint')
       });
    });
 })
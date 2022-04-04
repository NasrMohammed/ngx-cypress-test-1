
function selectGroupMenuItem(groupName) {
    cy.contains('a', 'Form').then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}


export class NavigationPage {
    formLayoutsPage() {
        selectGroupMenuItem('Form')       
        cy.contains('Form Layouts').click()
    }
    datePickerPage() {
        selectGroupMenuItem('Form')       
        cy.contains('Datepicker').click()
    }
    toasterPage() {
        selectGroupMenuItem('Modal & Overlays')       
        cy.contains('Toastr').click({force: true})
    }
    smartTablePage() {
        selectGroupMenuItem('Tables & Dates')       
        cy.contains('Smart Table').click({force: true})
    }
    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays')       
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavigationPage()
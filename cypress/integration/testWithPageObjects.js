import { onDatePickerPage } from "../support/page_Objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_Objects/formLayoutsPage"
import { navigateTo } from "../support/page_Objects/navigationPage"
import { onSmartTablePage } from "../support/page_Objects/smartTablePage"

describe('Test with Page Objects', () => {
    beforeEach('open application', () => {
        cy.OpenHomePage()
    })
    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
        navigateTo.smartTablePage()
    })
    it.only('should submit inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Nasri', 'Test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerFromToday(1)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Nasri', 'Mohammed')
        onSmartTablePage.updateAgeByFirstName('Larry', '41')
        onSmartTablePage.deleteRowByIndex(5)
    })
})
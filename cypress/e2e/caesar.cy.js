describe('Caesar Cipher Form', () => {
    beforeEach(() => {
        cy.visit('../../caesar.html');
    });

    it('Automates the form completion, validation, and result verification', () => {
        // 1. Automate the form completion
        cy.get('#cipherKey').clear().type('6');
        cy.get('#inputText').clear().type('Hello World!');

        // 2. Automate the validation of the form
        cy.get('#cipherKey').should('have.value', '6');
        cy.get('#inputText').should('have.value', 'Hello World!');

        // Click the cipher button
        cy.get('#cipherButton').click();

        // 3. Verify that the correct result is displayed
        cy.get('#outputText').should('have.value', 'Nkrru Cuxrj!');
    });

    it('Handles negative shift values', () => {
        cy.get('#cipherKey').clear().type('-3');
        cy.get('#inputText').clear().type('Hello World!');
        cy.get('#cipherButton').click();
        cy.get('#outputText').should('have.value', 'Ebiil Tloia!');
    });

    it('Handles different input text', () => {
        cy.get('#cipherKey').clear().type('10');
        cy.get('#inputText').clear().type('This is a test!');
        cy.get('#cipherButton').click();
        cy.get('#outputText').should('have.value', 'Drsc sc k docd!');
    });
});
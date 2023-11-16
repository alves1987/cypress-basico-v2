Cypress.Commands.add('fillMandatoryFieldsAndSubimit', function(){
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('thiagoalves87@hotmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

})
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')   
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulario', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('thiagoalves87@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação invalida', function() {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('thiagoalves87@hotmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })        

    it('campo telefone continua vazia quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes de envio', function() {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('thiagoalves87@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos de nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Thiago')
          .should('have.value', 'Thiago')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Alves')
          .should('have.value', 'Alves')
          .clear()
          .should('have.value', '')  
        cy.get('#email')
          .type('thiagoalves87@hotmail.com')
          .should('have.value', 'thiagoalves87@hotmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('48988289123')
          .should('have.value', '48988289123')
          .clear()
          .should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia um formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubimit()  

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube') 
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')  
          .should('have.value', 'mentoria')

    })

    it('Seleciona um produto (blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')

    })

    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')  
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)  
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })

    })

    it('Marcar ambos checkboxes, depois desmarcar o último', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')

    })

    it('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
      
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

    it





  })



  
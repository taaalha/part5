describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {      
      name: 'local test user',      
      username: 'test_user',      
      password: 'test1234'    
    }   
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('test1234')
      cy.get('#login-button').click()

      cy.contains('local test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'Wrong Username or Password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })
  })

})
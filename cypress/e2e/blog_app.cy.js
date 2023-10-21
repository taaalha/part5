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

    describe('When logged in', function() {
        beforeEach(function() {
        cy.get('#username').type('test_user')
        cy.get('#password').type('test1234')
        cy.get('#login-button').click()
        cy.contains('local test user logged in')
      })
      
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#create-button').click()
  
        cy.contains('test blog')
        cy.get('.error')
        .should('contain', 'A new blog test blog by test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      
      })
    })
  })

  //A test that confirms users can like a blog.
  describe('When logged in and blog created', function() {
    beforeEach(function() {
      cy.get('#username').type('test_user')
      cy.get('#password').type('test1234')
      cy.get('#login-button').click()
      cy.contains('local test user logged in')

      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()
    })

    it('A blog can be liked', function() {
      cy.contains('test blog').parent().contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')
      cy.contains('hide').click()
      cy.reload()
    })

    //A test that confirms users can delete a blog they created.
    it('A blog can be deleted', function() { 
        cy.reload()
        cy.contains('logout').click()
        cy.get('#username').type('test_user')
        cy.get('#password').type('test1234')
        cy.get('#login-button').click()
        cy.contains('local test user logged in')

        cy.contains('test blog').parent().contains('view').click()
        cy.contains('remove').click()
        cy.contains('test blog').should('not.exist')
    })


    //A test that blog can only be deleted by the user who created it
    describe('A blog can only be deleted by the user who created it', function() {
      beforeEach(function() {
        const user = {      
          name: 'local test user2',      
          username: 'test_user2',      
          password: 'test1234'    
        }   
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    
        cy.visit('http://localhost:3000/')
      })

      it('A blog can only be deleted by the user who created it', function() {
        cy.contains('logout').click()
        cy.get('#username').type('test_user2')
        cy.get('#password').type('test1234')
        cy.get('#login-button').click()
        cy.contains('local test user2 logged in')

        cy.contains('test blog').parent().contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('blogs are ordered by likes', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('test blog2')
        cy.get('#author').type('test author2')
        cy.get('#url').type('test url2')
        cy.get('#create-button').click()
        cy.contains('test blog2')

        cy.get('#new-blog').click()
        cy.get('#title').type('test blog3')
        cy.get('#author').type('test author3')
        cy.get('#url').type('test url3')
        cy.get('#create-button').click()
      })

      it('blogs are ordered by likes', function() {
        cy.wait(5000)
        cy.contains('test blog2').contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
        cy.contains('hide').click()

        cy.wait(3000)
        cy.contains('test blog3').contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
        cy.contains('like').click()
        cy.contains('likes 3')
        cy.contains('hide').click()

        cy.reload()

        cy.get('.blog').eq(0).should('contain', 'test blog3')
        cy.get('.blog').eq(1).should('contain', 'test blog2')
        cy.get('.blog').eq(2).should('contain', 'test blog')
      })
    })
  })
})
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

  //Make a test that confirms users can like a blog.

  describe('When logged in and blog created', function() {
    beforeEach(function() {
/*       cy.request('POST', 'http://localhost:3003/api/login/', {      
        username: 'test_user', password: 'test1234'    
      })
      .then(response => {      
          localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))      
          cy.visit('http://localhost:3000/')    
        }) */
      cy.get('#username').type('test_user')
      cy.get('#password').type('test1234')
      cy.get('#login-button').click()
      cy.contains('local test user logged in')


      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

/*       cy.get('#new-blog').click()
      cy.get('#title').type('test blog2')
      cy.get('#author').type('test author2')
      cy.get('#url').type('test url2')
      cy.get('#create-button').click()
      cy.contains('test blog2')

      cy.get('#new-blog').click()
      cy.get('#title').type('test blog3')
      cy.get('#author').type('test author3')
      cy.get('#url').type('test url3')
      cy.get('#create-button').click() */

    })

    it.only('A blog can be liked', function() {

      cy.contains('test blog').parent().contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')

    })
/* 
    it.only('A blog can be liked', function() {
      // Start by finding the section containing saved blogs
      cy.contains('Saved blogs').next().within(() => {
        // Now look for the specific blog title and interact with it
        cy.contains('test blog').parent().as('blog1')
        cy.get('@blog1').contains('view').click()
        cy.get('@blog1').contains('like').click()
        cy.get('@blog1').contains('likes 1')
    
        // Like the second blog twice.
        cy.contains('test blog2').parent().as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('like').click()
        cy.get('@blog2').contains('likes 1')
      })
    }) */
    
    

    //Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.

/*     it('Blogs are ordered according to likes', function() {
      cy.contains('test blog2').parent().contains('view').click()
      cy.contains('test blog2').parent().contains('like').click()
      cy.contains('test blog2').parent().contains('like').click()
      cy.contains('test blog2').parent().contains('likes 2')
  
      // Like the third blog once.
      cy.contains('test blog3').parent().contains('view').click()
      cy.contains('test blog3').parent().contains('like').click()
      cy.contains('test blog3').parent().contains('likes 1')

  }) */

  })

   

})
describe('Login Flow', () => {
  it('should log in successfully and redirect to the products page', () => {
    cy.fixture('example.json').then(user => {
      // Visit the login page
      cy.visit('/login');

      // Enter username and password
      cy.get('input[formcontrolname="username"]').type(user.username);
      cy.get('input[formcontrolname="password"]').type(user.password);

      // Click the login button
      cy.get('button[type="submit"]').click();

      // Assert that the URL is now the products page
      cy.url().should('include', '/products');

      // Assert that the header is visible (or any other element that indicates a successful login)
      cy.get('app-header').should('be.visible');
    });
  });
});

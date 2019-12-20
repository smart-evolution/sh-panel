Cypress.Commands.add('login', {}, () => {
  cy.visit('http://localhost:3223/login/register');

  cy.get('.tst-email').type('admin@localhost.pl');
  cy.get('.tst-password').type('admin');
  cy.get('.tst-api-server').type('127.0.0.1');
  cy.get('.tst-register').click();

  cy.get('.tst-login').click();
  cy.get('.tst-email').type('admin@localhost.pl');
  cy.get('.tst-password').type('admin');
  cy.get('.tst-login').click();
});

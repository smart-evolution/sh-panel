// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

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

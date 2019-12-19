describe('add agent', () => {
  before(function () {
    cy.login();
  });

  beforeEach(function () {
    Cypress.Cookies.preserveOnce('sid', 'remember_token');
  });

  it('should add agent', () => {
    cy.get('.tst-add-agent-id').type('654302497');
    cy.get('.tst-add-agent-ip').type('192.168.1.56');
    cy.get('.tst-add-agent-name').type('Bedroom');
    cy.get('.tst-add-agent-type').type('type1-v1.0.0');
    cy.get('.tst-add-agent-submit').click();
    cy.wait(2000);
  });
})

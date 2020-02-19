describe('remove agent', () => {
  before(function () {
    cy.resetDb();
    cy.login();

    cy.get('.tst-nav-admin').click();

    cy.get('.tst-add-agent-id').type('654302497');
    cy.get('.tst-add-agent-ip').type('192.168.1.56');
    cy.get('.tst-add-agent-name').type('Bedroom');
    cy.get('.tst-add-agent-type').type('type1-v1.0.0');
    cy.get('.tst-add-agent-submit').click();
  });

  beforeEach(function () {
    Cypress.Cookies.preserveOnce('sid', 'remember_token');
    Cypress.Cookies.preserveOnce('shpanel-sid', 'remember_token');
  });

  it('should remove agent', () => {
    cy.get('.tst-nav-dashboard').click();

    cy.get('.tst-agent-status-654302497').find('.agent-type1__link').click();
    cy.get('.tst-edit-btn').click();
    cy.get('.tst-delete').click();

    cy.get('.agents-list').find('.agents-list__list li').should('have.length', 0);
  });
})

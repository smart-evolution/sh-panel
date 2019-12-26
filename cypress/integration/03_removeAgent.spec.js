describe.only('remove agent', () => {
  before(function () {
    cy.login();
  });

  beforeEach(function () {
    Cypress.Cookies.preserveOnce('sid', 'remember_token');
  });

  it('should remove agent', () => {
    cy.get('.tst-agent-status-654302497').find('.agent-type1__link').click();
    cy.get('.tst-edit-btn').click();
    cy.get('.tst-delete').click();

    cy.get('.agents-list').find('.agents-list__list li').should('have.length', 0);
  });
})

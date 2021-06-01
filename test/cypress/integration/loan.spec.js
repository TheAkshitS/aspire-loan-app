describe('Loan tests', () => {
  beforeEach(() => {
    cy.visit('/loan')
  })

  it('loads loan form', () => {
    cy.get('[data-cy=loan-form]')
    cy.get('.q-field__native').should('have.length', 5)
  })
})

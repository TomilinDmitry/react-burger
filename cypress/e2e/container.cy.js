describe('Click on Card', () => {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' }).as(
      'Ingredients',
    );
  });
  it('Click on card', () => {
    cy.viewport(1920, 1080);
    cy.baseUrl();
    cy.get('[data-testid="bun"]').first().click();
    cy.contains('Детали').should('be.visible');
    cy.closeIcon();
    cy.contains('Соберите бургер').should('be.visible');
  });
});
describe('Move Ingredient and Create Order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' }).as(
      'Ingredients',
    );
    cy.intercept('POST', 'orders', { fixture: 'order' }).as('Order');
  });
  it('move', () => {
    cy.viewport(1920, 1080);
    cy.baseUrl();
    cy.moveIngredient();
    cy.makeOrder();
    cy.loginUser('bezzy69@yandex.ru', '12345qq');
    cy.makeOrder();
    cy.closeIcon();
    cy.contains('Соберите бургер');
  });
});

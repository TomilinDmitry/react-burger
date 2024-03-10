describe('Click on Card', () => {
  it('Click on card', () => {
    cy.visit('http://localhost:3002/');
    cy.get('[data-testid="bun"]').first().click();
    cy.contains('Детали');
    cy.get('[data-testid="closeIcon"]').click();
    cy.contains('Соберите бургер');
  });
});
describe('Move Ingredient and Create Order', () => {
  it('move', () => {
    cy.visit('http://localhost:3002/');
    cy.get('[data-testid="bun"]').first();
    cy.get('[data-testid="sauce"]').first();
    cy.get('[data-testid="targetBlock"]').contains('Выберите булки');
    cy.get('[data-testid="mainIng"]').contains('Выберите начинку');
    cy.get('[data-testid="bun"]').first().trigger('dragstart');
    cy.get('[data-testid="targetBlock"]').trigger('drop');
    cy.get('[data-testid="sauce"]').first().trigger('dragstart');
    cy.get('[data-testid="mainIng"]').trigger('drop');
    cy.get('[data-testid="buttonOrder"]')
      .contains('Оформить заказ')
      .click();
    cy.get('input[type="email"]').type('bezzy69@yandex.ru');
    cy.get('input[type="password"]').type('12345qq');
    cy.get('button').click();
    cy.get('[data-testid="buttonOrder"]')
      .contains('Оформить заказ')
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(18000);
    cy.contains('Детали');

    cy.get('[data-testid="closeIcon"]').click();
    cy.contains('Соберите бургер');
  });
});

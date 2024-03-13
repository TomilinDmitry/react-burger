/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('loginUser', (email, password) => {
  cy.intercept('POST', 'login', { fixture: 'login' }).as('Login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button').click();
});
Cypress.Commands.add('closeIcon', () => {
  cy.contains('Детали').should('be.visible');
  cy.get('[data-testid="closeIcon"]').click();
});
Cypress.Commands.add('moveIngredient', () => {
  cy.get('[data-testid="bun"]').as('bun');
  cy.get('[data-testid="sauce"]').as('sauce');
  cy.get('[data-testid="targetBlock"]')
    .contains('Выберите булки')
    .should('be.visible')
    .as('targetBlock');
  cy.get('[data-testid="mainIng"]').contains('Выберите начинку');
  cy.get('@bun').trigger('dragstart');
  cy.get('@targetBlock').trigger('drop');
  cy.get('@sauce').trigger('dragstart');
  cy.get('[data-testid="mainIng"]').trigger('drop');
});
Cypress.Commands.add('makeOrder', () => {
  cy.get('[data-testid="buttonOrder"]')
    .contains('Оформить заказ')
    .click();
});
Cypress.Commands.add('baseUrl', () => {
  cy.visit('http://localhost:3000/#/');
});

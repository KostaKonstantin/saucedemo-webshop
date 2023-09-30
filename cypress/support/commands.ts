// commands.ts
import { loginPage } from "./pages/login";
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit(loginPage.url);
  loginPage.userNameInput().type(username);
  loginPage.passwordInput().type(password);
  loginPage.loginButton().click();
});

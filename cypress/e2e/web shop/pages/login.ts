class LoginPage {
  url = "https://www.saucedemo.com/";

  userNameInput() {
    return cy.get("#user-name");
  }

  passwordInput() {
    return cy.get("#password");
  }

  loginButton() {
    return cy.get("#login-button");
  }

  loginLogo() {
    return cy.get(".login_logo");
  }

  loginCredentials() {
    return cy.get(".login_credentials_wrap");
  }

  errorPopUp() {
    return cy.get('[data-test="error"]')
  }
}

export const loginPage = new LoginPage();

import { mainPage } from "./mainPage";
class LoginPage {
  // URL for the login page
  url = "https://www.saucedemo.com/";

  // Selectors for various elements on the page
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
    return cy.get('[data-test="error"]');
  }

  // Custom method to check if login is successful
  assertLoginSuccess() {
    mainPage.inventoryContainer().should("be.visible");
    expect(mainPage.url).to.include("https://www.saucedemo.com/inventory.html");
  }

  // Custom method for logging in with valid credentials
  loginFormCredentials(username: string, password: string) {
    this.userNameInput().type(username);
    this.passwordInput().type(password);
    this.loginButton().click();
  }

  // Custom method for logging out
  logOut() {
    mainPage.sideMenuButton().click();
    mainPage.logOutLink().click();
  }

  // Custom method for log out success
  assertLogoutSuccess() {
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  }

  // Custom method to assert error pop-up text
  assertErrorPopUpText(errorText: string) {
    loginPage.errorPopUp().should("be.visible").and("have.text", errorText);
  }

  // Custom method to assert the current URL
  assertUrl(expectedUrl: string) {
    expect(loginPage.url).to.include(expectedUrl);
  }

  // Custom method to assert the existence of main UI elements
  assertMainUIElementsVisibility() {
    this.loginLogo().should("have.text", "Swag Labs").and("exist");
    this.userNameInput().should("exist");
    this.passwordInput().should("exist");
    this.loginButton().should("exist");
    this.loginCredentials().should("exist");
  }
}

export const loginPage = new LoginPage();

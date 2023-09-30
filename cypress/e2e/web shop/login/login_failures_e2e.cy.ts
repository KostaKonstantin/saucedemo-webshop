import { mockInvalidUser } from "../../../support/mock-user/mock-invalid-user";
import { mockLockedUser } from "../../../support/mock-user/mock-locked-user";
import { mockValidUser } from "../../../support/mock-user/mock-valid-user";

import { loginPage } from "../../../support/pages/login";

describe("Login Page Negative E2E Test", () => {
  beforeEach(() => {
    // ARRANGE: Visit the login page before each test
    cy.visit(loginPage.url);
  });

  it("Should Throw An Error When Logging In With Empty Fields", () => {
    // ACT: Click the login button without entering any credentials
    loginPage.loginButton().click();

    // ASSERT: Check for the error message and URL
    loginPage.assertErrorPopUpText("Epic sadface: Username is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Login With False Username And Password", () => {
    // ARRANGE: Enter invalid credentials
    loginPage.loginFormCredentials(mockInvalidUser.userName, mockInvalidUser.password);

    // ACT: Click the login button
    loginPage.loginButton().click();

    // ASSERT: Check for the error message and URL
    loginPage.assertErrorPopUpText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In Without Password", () => {
    // ARRANGE: Enter a valid username but no password
    loginPage.userNameInput().type(mockValidUser.userName);

    // ACT: Click the login button
    loginPage.loginButton().click();

    // ASSERT: Check for the error message and URL
    loginPage.assertErrorPopUpText("Epic sadface: Password is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In With Out Username", () => {
    // ARRANGE: Enter a valid password but no username
    loginPage.passwordInput().type(mockValidUser.password);

    // ACT: Click the login button
    loginPage.loginButton().click();

    // ASSERT: Check for the error message and URL
    loginPage.assertErrorPopUpText("Epic sadface: Username is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Login As Locked User", () => {
    // ARRANGE: Enter locked user credentials
    loginPage.loginFormCredentials(mockLockedUser.userName, mockLockedUser.password);

    // ACT: Click the login button
    loginPage.loginButton().click();

    // ASSERT: Check for the error message and URL
    loginPage.assertErrorPopUpText("Epic sadface: Sorry, this user has been locked out.");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });
});

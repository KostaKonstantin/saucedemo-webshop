import { mockInvalidUser } from "../mock-user/mock-invalid-user";
import { mockLockedUser } from "../mock-user/mock-locked-user";
import { mockValidUser } from "../mock-user/mock-valid-user";
import { loginPage } from "../pages/login";

describe("Login Page Negative E2E Test", () => {
  beforeEach(() => {
    cy.visit(loginPage.url);
  });

  it("Should Throw An Error When Logging In With Empty Fields", () => {
    // ACT
    loginPage.loginButton().click();

    // ASSERT
    loginPage.assertErrorPopUpText("Epic sadface: Username is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Login With False Username And Password", () => {
    // ARRANGE
    loginPage.loginFormCredentials(mockInvalidUser.userName, mockInvalidUser.password);

    // ACT
    loginPage.loginButton().click();

    // ASSERT
    loginPage.assertErrorPopUpText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In Without Password", () => {
    // ARRANGE
    loginPage.userNameInput().type(mockValidUser.userName);

    // ACT
    loginPage.loginButton().click();

    // ASSERT
    loginPage.assertErrorPopUpText("Epic sadface: Password is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In With Out Username", () => {
    // ARRANGE
    loginPage.passwordInput().type(mockValidUser.password);

    // ACT
    loginPage.loginButton().click();

    // ASSERT
    loginPage.assertErrorPopUpText("Epic sadface: Username is required");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Login As Locked User", () => {
    // ARRANGE
    loginPage.loginFormCredentials(mockLockedUser.userName, mockLockedUser.password);

    // ACT
    loginPage.loginButton().click();

    // ASSERT
    loginPage.assertErrorPopUpText("Epic sadface: Sorry, this user has been locked out.");
    loginPage.assertUrl("https://www.saucedemo.com/");
  });
});

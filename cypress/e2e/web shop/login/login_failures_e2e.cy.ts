import { mockInvalidUser } from "../mock-user/mock-invalid-user";
import { mockLockedUser } from "../mock-user/mock-locked-user";
import { mockValidUser } from "../mock-user/mock-valid-user";
import { loginPage } from "../pages/login";

describe("Login Page Negative E2E Test", () => {
  beforeEach(() => {
    cy.visit(loginPage.url);
  });

  it("Should Throw An Error When Logging In With Empty Fields", () => {
    //ACT
    loginPage.loginButton().click();

    //ASSERT
    loginPage
      .errorPopUp()
      .should("be.visible")
      .and("have.text", "Epic sadface: Username is required");
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Login In With False Username And Password", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockInvalidUser.userName);
    loginPage.passwordInput().type(mockInvalidUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    loginPage
      .errorPopUp()
      .should("be.visible")
      .and(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In With Out Password", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockValidUser.userName);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    loginPage
      .errorPopUp()
      .should("be.visible")
      .and("have.text", "Epic sadface: Password is required");
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });

  it("Should Throw An Error When Logging In With Out Username", () => {
    //ARRANGE
    loginPage.passwordInput().type(mockValidUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    loginPage
      .errorPopUp()
      .should("be.visible")
      .and("have.text", "Epic sadface: Username is required");
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });

  it("Should Not Be Able to Log In As Locked User", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockLockedUser.userName);
    loginPage.passwordInput().type(mockLockedUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    loginPage
      .errorPopUp()
      .should("be.visible")
      .and("have.text", "Epic sadface: Sorry, this user has been locked out.");
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });
});

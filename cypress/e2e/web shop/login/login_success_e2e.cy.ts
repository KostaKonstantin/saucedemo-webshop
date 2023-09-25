import { mockGlitchUser } from "../mock-user/mock-glitch-user";
import { mockProblemUser } from "../mock-user/mock-problem-user";
import { mockValidUser } from "../mock-user/mock-valid-user";

import { loginPage } from "../pages/login";
import { mainPage } from "../pages/mainPage";

describe("Login Page Positive E2E Test", () => {
  beforeEach(() => {
    cy.visit(loginPage.url);
  });
  it("Should Display Main UI Elements On The Page", () => {
    //ASSERT
    loginPage.loginLogo().should("have.text", "Swag Labs").and("exist");
    loginPage.userNameInput().should("exist");
    loginPage.passwordInput().should("exist");
    loginPage.loginButton().should("exist");
    loginPage.loginCredentials().should("exist");
  });

  it("Should Be Able Log In With Valid Credentials", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockValidUser.userName);
    loginPage.passwordInput().type(mockValidUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    mainPage.inventoryContainer().should("be.visible");
    expect(mainPage.url).to.include("https://www.saucedemo.com/inventory.html");
  });

  it("Should Be Able Log Out With Valid Credentials", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockValidUser.userName);
    loginPage.passwordInput().type(mockValidUser.password);
    loginPage.loginButton().click();

    //ACT
    mainPage.sideMenuButton().click();
    mainPage.logOutLink().click();

    //ASSERT
    expect(loginPage.url).to.include("https://www.saucedemo.com/");
  });

  it("Should Be Able Log In With Problem User Credentials", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockProblemUser.userName);
    loginPage.passwordInput().type(mockProblemUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    mainPage.inventoryContainer().should("be.visible");
    expect(mainPage.url).to.include("https://www.saucedemo.com/inventory.html");
  });

  it("Should Be Able Log In With Glitch User Credentials", () => {
    //ARRANGE
    loginPage.userNameInput().type(mockGlitchUser.userName);
    loginPage.passwordInput().type(mockGlitchUser.password);

    //ACT
    loginPage.loginButton().click();

    //ASSERT
    mainPage.inventoryContainer().should("be.visible");
    expect(mainPage.url).to.include("https://www.saucedemo.com/inventory.html");
  });
});

import { mockGlitchUser } from "../../../support/mock-user/mock-glitch-user";
import { mockProblemUser } from "../../../support/mock-user/mock-problem-user";
import { mockValidUser } from "../../../support/mock-user/mock-valid-user";

import { loginPage } from "../../../support/pages/login";

describe("Login Page Positive E2E Test", () => {
  beforeEach(() => {
    cy.visit(loginPage.url);
  });

  it("Should Display Main UI Elements On The Page", () => {
    //ASSERT
    loginPage.assertMainUIElementsVisibility();
  });

  it("Should Be Able Log In With Valid Credentials", () => {
    //ACT
    loginPage.loginFormCredentials(
      mockValidUser.userName,
      mockValidUser.password
    );

    //ASSERT
    loginPage.assertLoginSuccess();
  });

  it("Should Be Able Log Out With Valid Credentials", () => {
    //ARRANGE
    loginPage.loginFormCredentials(
      mockValidUser.userName,
      mockValidUser.password
    );

    //ACT
    loginPage.logOut();

    //ASSERT
    loginPage.assertLogoutSuccess();
  });

  it("Should Be Able Log In With Problem User Credentials", () => {
    //ACT
    loginPage.loginFormCredentials(
      mockProblemUser.userName,
      mockProblemUser.password
    );

    //ASSERT
    loginPage.assertLoginSuccess();
  });

  it("Should Be Able Log In With Glitch User Credentials", () => {
    //ACT
    loginPage.loginFormCredentials(
      mockGlitchUser.userName,
      mockGlitchUser.password
    );

    //ASSERT
    loginPage.assertLoginSuccess();
  });
});

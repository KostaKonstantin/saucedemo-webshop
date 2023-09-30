import { mockGlitchUser } from "../../../support/mock-user/mock-glitch-user";
import { mockProblemUser } from "../../../support/mock-user/mock-problem-user";
import { mockValidUser } from "../../../support/mock-user/mock-valid-user";

import { loginPage } from "../../../support/pages/login";

describe("Login Page Positive E2E Test", () => {
  beforeEach(() => {
    // ARRANGE: Visit the login page before each test
    cy.visit(loginPage.url);
  });

  it("Should Display Main UI Elements On The Page", () => {
    // ASSERT: Ensure that main UI elements are visible on the page
    loginPage.assertMainUIElementsVisibility();
  });

  it("Should Be Able Log In With Valid Credentials", () => {
    // ACT: Log in with valid user credentials
    loginPage.loginFormCredentials(
      mockValidUser.userName,
      mockValidUser.password
    );

    // ASSERT: Check for successful login
    loginPage.assertLoginSuccess();
  });

  it("Should Be Able Log Out With Valid Credentials", () => {
    // ARRANGE: Log in first with valid credentials
    loginPage.loginFormCredentials(
      mockValidUser.userName,
      mockValidUser.password
    );

    // ACT: Log out
    loginPage.logOut();

    // ASSERT: Check for successful logout
    loginPage.assertLogoutSuccess();
  });

  it("Should Be Able Log In With Problem User Credentials", () => {
    // ACT: Log in with problem user credentials
    loginPage.loginFormCredentials(
      mockProblemUser.userName,
      mockProblemUser.password
    );

    // ASSERT: Check for successful login
    loginPage.assertLoginSuccess();
  });

  it("Should Be Able Log In With Glitch User Credentials", () => {
    // ACT: Log in with glitch user credentials
    loginPage.loginFormCredentials(
      mockGlitchUser.userName,
      mockGlitchUser.password
    );

    // ASSERT: Check for successful login
    loginPage.assertLoginSuccess();
  });
});

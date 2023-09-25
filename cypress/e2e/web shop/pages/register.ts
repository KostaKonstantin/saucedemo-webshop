class RegisterPage {
  url = "https://magento.softwaretestingboard.com/customer/account/create/";

  firstNameInput() {
    return cy.get("#firstname");
  }

  lastNameInput() {
    return cy.get("#lastname");
  }

  emailInput() {
    return cy.get("#email_address");
  }

  passwordInput() {
    return cy.get("#password");
  }

  confirmPasswordInput() {
    return cy.get("#password-confirmation");
  }

  createAccountButton() {
    return cy.get(".action.submit.primary");
  }

  mainNavigationBar() {
    return cy.get("#ui-id-2");
  }

  searchBar() {
    return cy.get("#search");
  }

  lumaLogo() {
    return cy.get(".logo");
  }

  footerContent() {
    return cy.get(".footer.content");
  }

  copyRight() {
    return cy.get(".copyright");
  }

  firstNameRequired() {
    return cy.get(".field.field-name-firstname.required");
  }

  lastNameRequired() {
    return cy.get(".field.field-name-lastname.required");
  }

  emailRequired() {
    return cy.get("div[class='field required']");
  }

  passwordRequired() {
    return cy.get(
      "fieldset[class='fieldset create account'] div[class='field password required']"
    );
  }

  confirmPasswordRequired() {
    return cy.get(".field.confirmation.required");
  }
}

export const registerPage = new RegisterPage();

class CheckoutPage {
  url = 'https://www.saucedemo.com/checkout-step-one.html'
  firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  continueButton() {
    return cy.get("#continue");
  }

  finishButton() {
    return cy.get('[data-test="finish"]');
  }

  checkoutContainer() {
    return cy.get("#checkout_complete_container");
  }

  backHomeButton() {
    return cy.get('[data-test="back-to-products"]');
  }

  errorContainer() {
    return cy.get('[data-test="error"]');
  }
}

export const checkoutPage = new CheckoutPage();
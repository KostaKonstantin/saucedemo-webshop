class CheckoutPage {
  // URL for the checkout page
  url = "https://www.saucedemo.com/checkout-step-one.html";

  // Selectors for various elements on the page
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

  cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  // Custom method to fill out the checkout form
  fillOutCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    this.firstNameInput().type(firstName);
    this.lastNameInput().type(lastName);
    this.postalCodeInput().type(postalCode);
  }

  // Custom method to cancel the checkout process
  cancelCheckout() {
    this.cancelButton().click();
  }

  // Custom method to assert the visibility of checkout form elements
  assertCheckoutFormElements() {
    this.firstNameInput().should("be.visible");
    this.lastNameInput().should("be.visible");
    this.postalCodeInput().should("be.visible");
    this.continueButton().should("be.visible");
  }
}

export const checkoutPage = new CheckoutPage();

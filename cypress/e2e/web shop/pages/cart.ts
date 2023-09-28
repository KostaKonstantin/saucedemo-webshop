class CartPage {
  // Selectors for various elements on the page
  cartList() {
    return cy.get(".cart_list");
  }

  checkOutButton() {
    return cy.get('[data-test="checkout"]');
  }

  continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  removeButton() {
    return cy.get("#remove-sauce-labs-onesie");
  }

  removedCartItem() {
    return cy.get(".removed_cart_item");
  }

  // Custom method to assert the visibility and content of cart elements
  assertCartElements() {
    this.cartList().should("be.visible");
    this.cartList().should("contain", "Sauce Labs Onesie");
    this.cartList().should("contain", "7.99");
    this.checkOutButton().should("be.visible");
    this.continueShoppingButton().should("be.visible");
    this.removeButton().should("be.visible");
  }
}

export const cartPage = new CartPage();

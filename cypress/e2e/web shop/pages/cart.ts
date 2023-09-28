class CartPage {
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
    return cy.get('.removed_cart_item')
  }
}

export const cartPage = new CartPage();

class MainPage {
  url = "https://www.saucedemo.com/inventory.html";

  sideMenuButton() {
    return cy.get("#react-burger-menu-btn");
  }

  logOutLink() {
    return cy.get("#logout_sidebar_link");
  }

  productSortContainer() {
    return cy.get('[data-test="product_sort_container"]');
  }

  inventoryContainer() {
    return cy.get("#inventory_container");
  }

  inventoryItem() {
    return cy.get(".inventory_item");
  }

  inventoryItemName() {
    return cy.get(".inventory_item_name");
  }

  inventoryItemDesc() {
    return cy.get(".inventory_item_desc");
  }

  inventoryItemPrices() {
    return cy.get(".inventory_item_price");
  }

  inventoryItemImg() {
    return cy.get(".inventory_item_img");
  }

  inventoryAddButton() {
    return cy.get(".btn.btn_primary.btn_small.btn_inventory");
  }

  addToCartOnesie() {
    return cy.get('[data-test="add-to-cart-sauce-labs-onesie"]');
  }

  removeButton() {
    return cy.get("#remove-sauce-labs-onesie");
  }

  shoppingCartNumber() {
    return cy.get(".shopping_cart_badge");
  }

  shoppingCartLink() {
    return cy.get('.shopping_cart_link')
  }
}

export const mainPage = new MainPage();

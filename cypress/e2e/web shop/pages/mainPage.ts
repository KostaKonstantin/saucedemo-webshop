class MainPage {
  // URL for the main page
  url = "https://www.saucedemo.com/inventory.html";

  // Selectors for various elements on the page
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
    return cy.get(".shopping_cart_link");
  }

  resetAppState() {
    return cy.get("#reset_sidebar_link");
  }

  // Custom method to assert product display
  assertProductDisplay() {
    this.productSortContainer().should("be.visible");
    this.inventoryContainer().should("be.visible");
    this.inventoryItem().should("have.length", 6);
  }

  // Custom method to assert item details
  assertItemDetails() {
    this.inventoryItemName().should("have.length", 6);
    this.inventoryItemDesc().should("have.length", 6);
    this.inventoryItemPrices().should("have.length", 6);
    this.inventoryAddButton().should("have.length", 6);
  }

  // Custom method to select a sorting option by value
  selectSortOption(value: string) {
    mainPage.productSortContainer().select(value);
  }

  // Custom method to get prices of inventory items
  getInventoryItemPrices() {
    return mainPage
      .inventoryItemPrices()
      .invoke("text")
      .then((pricesText) =>
        pricesText
          .split("\n")
          .map((priceStr) => parseFloat(priceStr.replace("$", "")))
      );
  }

  // Custom method to get names of inventory items
  getInventoryItemNames() {
    return mainPage
      .inventoryItemName()
      .invoke("text")
      .then((namesText) => namesText.split("\n"));
  }

  // Custom method to assert that prices are sorted low to high
  assertPricesSortedLowToHigh() {
    this.selectSortOption("lohi");

    this.getInventoryItemPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(
        sortedPrices,
        "Prices should be sorted from low to high"
      );
    });
  }

  // Custom method to assert that prices are sorted high to low
  assertPricesSortedHighToLow() {
    this.selectSortOption("hilo");

    this.getInventoryItemPrices().then((prices) => {
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(
        sortedPrices,
        "Prices should be sorted from high to low"
      );
    });
  }

  // Custom method to assert that names are sorted A to Z
  assertNamesSortedAToZ() {
    this.selectSortOption("az");

    this.getInventoryItemNames().then((names) => {
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(
        sortedNames,
        "Inventory items should be sorted from A to Z"
      );
    });
  }

  // Custom method to assert that names are sorted Z to A
  assertNamesSortedZToA() {
    this.selectSortOption("za");

    this.getInventoryItemNames().then((names) => {
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(
        sortedNames,
        "Inventory items should be sorted from Z to A"
      );
    });
  }
}

export const mainPage = new MainPage();

import "../../../support/commands";
import { mainPage } from "../../../support/pages/mainPage";
import { cartPage } from "../../../support/pages/cart";
import { checkoutPage } from "../../../support/pages/checkout";

import { mockProblemUser } from "../../../support/mock-user/mock-problem-user";

describe("Products Standard User E2E Test", () => {
  beforeEach(() => {
    // ARRANGE AND ACT: Login with a problem user before each test
    cy.login(mockProblemUser.userName, mockProblemUser.password);
  });

  it("Should Display Products On The Page", () => {
    // ASSERT: Check if product-related elements are visible
    mainPage.inventoryContainer().should("be.visible");
    mainPage.productSortContainer().should("be.visible");
    mainPage.inventoryItem().should("have.length", 6);
  });

  it("Should Display 6 Item Names, Images, Descriptions, Prices And Add To Cart Buttons", () => {
    // ASSERT: Check if item details and add to cart buttons are visible
    mainPage.inventoryItemName().should("have.length", 6);
    mainPage.inventoryItemDesc().should("have.length", 6);
    mainPage.inventoryItemPrices().should("have.length", 6);
    mainPage.inventoryAddButton().should("have.length", 6);
  });

  it("Should Not Change Sorting Order When Clicking Sort Options", () => {
    // ARRANGE AND ACT: Capture initial prices and names, then change sorting
    let initialPrices;
    mainPage
      .inventoryItemPrices()
      .invoke("text")
      .then((pricesText) => {
        initialPrices = pricesText.split("\n");
      });

    let initialNames;
    mainPage
      .inventoryItemName()
      .invoke("text")
      .then((namesText) => {
        initialNames = namesText.split("\n");
      });

    mainPage.productSortContainer().select("lohi");

    let sortedPrices;
    mainPage
      .inventoryItemPrices()
      .invoke("text")
      .then((pricesText) => {
        sortedPrices = pricesText.split("\n");
      });

    let sortedNames;
    mainPage
      .inventoryItemName()
      .invoke("text")
      .then((namesText) => {
        sortedNames = namesText.split("\n");
      });

    // ASSERT: Compare initial and sorted prices and names
    expect(initialPrices).to.deep.equal(
      sortedPrices,
      "Prices should not change after sorting"
    );
    expect(initialNames).to.deep.equal(
      sortedNames,
      "Names should not change after sorting"
    );
  });

  it("Should Reset App State When Clicking On It", () => {
    // ARRANGE: Add an item to the cart
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartNumber().should("be.visible").and("have.text", "1");

    // ACT: Click the side menu and reset the app state
    mainPage.sideMenuButton().click();
    mainPage.resetAppState().click();

    // ASSERT: Verify the shopping cart is empty
    mainPage.shoppingCartNumber().should("not.exist");
  });

  it("Should Display Remove Button When Trying To Add A Product To The Cart", () => {
    // ACT: Add a product to the cart
    mainPage.addToCartOnesie().click();

    // ASSERT: Check if the shopping cart and remove button are visible
    mainPage.shoppingCartNumber().should("be.visible").and("have.text", "1");
    mainPage.removeButton().should("be.visible");
  });

  it("Should Have A Selected Item and Main UI On The Cart Page", () => {
    // ACT: Add a product to the cart and navigate to the cart page
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();

    // ASSERT: Check if cart-related elements are visible
    cartPage.cartList().should("be.visible");
    cartPage.cartList().should("contain", "Sauce Labs Onesie");
    cartPage.cartList().should("contain", "7.99");
    cartPage.checkOutButton().should("be.visible");
    cartPage.continueShoppingButton().should("be.visible");
    cartPage.removeButton().should("be.visible");
  });

  it("Should Successfully Remove An Item From The Cart Page", () => {
    // ACT: Add a product to the cart, navigate to the cart page, and remove the item
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.removeButton().click();

    // ASSERT: Check if the removed item is no longer visible
    cartPage.removedCartItem().should("exist");
  });

  it("Should Display Main UI On Checkout Page", () => {
    // ACT: Add a product to the cart, navigate to the cart page, and proceed to checkout
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    // ASSERT: Check if checkout-related elements are visible
    checkoutPage.firstNameInput().should("be.visible");
    checkoutPage.lastNameInput().should("be.visible");
    checkoutPage.postalCodeInput().should("be visible");
    checkoutPage.continueButton().should("be.visible");
  });

  it("Should Not Be Able to Checkout", () => {
    // ARRANGE: Add a product to the cart, navigate to checkout, and fill out some details
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();
    checkoutPage.firstNameInput().type("Joe");
    checkoutPage.lastNameInput().type("Doe");
    checkoutPage.postalCodeInput().type("24000");

    // ACT: Attempt to continue without entering the last name
    checkoutPage.continueButton().click();

    // ASSERT: Check for the error message and URL
    checkoutPage
      .errorContainer()
      .should("be.visible")
      .and("contain", "Error: Last Name is required");
    expect(checkoutPage.url).to.contain(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });

  it("Should Return The User To The Main Page When Cancelling The Order", () => {
    // ARRANGE: Add a product to the cart, navigate to checkout, and fill out some details
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();
    checkoutPage.firstNameInput().type("Joe");
    checkoutPage.lastNameInput().type("Doe");
    checkoutPage.postalCodeInput().type("24000");

    // ACT: Cancel the order
    checkoutPage.cancelButton().click();

    // ASSERT: Check if the URL is the main page URL
    expect(mainPage.url).to.contain("https://www.saucedemo.com/inventory.html");
  });
});

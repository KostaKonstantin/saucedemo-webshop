import "../../../support/commands";
import { mainPage } from "../../../support/pages/mainPage";
import { cartPage } from "../../../support/pages/cart";
import { checkoutPage } from "../../../support/pages/checkout";

import { mockValidUser } from "../../../support/mock-user/mock-valid-user";


describe("Products Standard User E2E Test", () => {
  beforeEach(() => {
    // ARRANGE AND ACT: Login with a valid user before each test
    cy.login(mockValidUser.userName, mockValidUser.password);
  });

  it("Should Display Products On The Page", () => {
    // ASSERT: Check if products are displayed on the page
    mainPage.assertProductDisplay();
  });

  it("Should Display 6 Item Names, Images, Descriptions, Prices And Add To Cart Buttons", () => {
    // ASSERT: Check if item details and add to cart buttons are displayed
    mainPage.assertItemDetails();
  });

  it("Should Successfully Sort With Every Sort Value", () => {
    // ACT AND ASSERT: Sort by various options and check if they are sorted correctly
    mainPage.selectSortOption("lohi");
    mainPage.assertPricesSortedLowToHigh();

    mainPage.selectSortOption("hilo");
    mainPage.assertPricesSortedHighToLow();

    mainPage.selectSortOption("az");
    mainPage.assertNamesSortedAToZ();

    mainPage.selectSortOption("za");
    mainPage.assertNamesSortedZToA();
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
    cartPage.assertCartElements();
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
    checkoutPage.assertCheckoutFormElements();
  });

  it("Should Successfully Checkout With A Selected Item", () => {
    // ARRANGE: Add a product to the cart, navigate to the cart page, and proceed to checkout
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    // ACT: Fill out the checkout form, continue, and finish the order
    checkoutPage.fillOutCheckoutForm("Joe", "Doe", "24000");
    checkoutPage.continueButton().click();
    checkoutPage.finishButton().click();

    // ASSERT: Check if the success message and back home button are visible
    checkoutPage
      .checkoutContainer()
      .should("be.visible")
      .and("contain", "Thank you for your order!");
    checkoutPage.backHomeButton().should("be.visible");
  });

  it("Should Return The User To The Main Page When Cancelling The Order", () => {
    // ARRANGE: Add a product to the cart, navigate to the cart page, and proceed to checkout
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    // ACT: Fill out the checkout form and then cancel the order
    checkoutPage.fillOutCheckoutForm("Joe", "Doe", "24000");
    checkoutPage.cancelCheckout();

    // ASSERT: Check if the URL is the main page URL
    expect(mainPage.url).to.contain("https://www.saucedemo.com/inventory.html");
  });
});

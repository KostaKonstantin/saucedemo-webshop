import { mockValidUser } from "../mock-user/mock-valid-user";
import "../../../support/commands";
import { mainPage } from "../pages/mainPage";
import { cartPage } from "../pages/cart";
import { checkoutPage } from "../pages/checkout";
import { mockProblemUser } from "../mock-user/mock-problem-user";

describe("Products Standard User E2E Test", () => {
  beforeEach(() => {
    cy.login(mockProblemUser.userName, mockProblemUser.password);
  });

  it("Should Display Products On The Page", () => {
    //ASSERT
    mainPage.inventoryContainer().should("be.visible");
    mainPage.productSortContainer().should("be.visible");
    mainPage.inventoryItem().should("have.length", 6);
  });

  it("Should Display 6 Item Names, Images, Descriptions, Prices And Add To Cart Buttons", () => {
    //ASSERT
    mainPage.inventoryItemName().should("have.length", 6);
    mainPage.inventoryItemDesc().should("have.length", 6);
    mainPage.inventoryItemPrices().should("have.length", 6);
    mainPage.inventoryAddButton().should("have.length", 6);
  });

  it("Should Not Change Sorting Order When Clicking Sort Options", () => {
    //ARRANGE AND ACT
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

    //ASSERT
    expect(initialPrices).to.deep.equal(
      sortedPrices,
      "Prices should not change after sorting"
    );
    expect(initialNames).to.deep.equal(
      sortedNames,
      "Names should not change after sorting"
    );
  });

  it("Should Display Remove Button When Trying To Add A Product To The Cart", () => {
    //ACT
    mainPage.addToCartOnesie().click();

    //ASSERT
    mainPage.shoppingCartNumber().should("be.visible").and("have.text", "1");
    mainPage.removeButton().should("be.visible");
  });

  it("Should Have A Selected Item and Main UI On The Cart Page", () => {
    //ACT
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();

    //ASSERT
    cartPage.cartList().should("be.visible");
    cartPage.cartList().should("contain", "Sauce Labs Onesie");
    cartPage.cartList().should("contain", "7.99");
    cartPage.checkOutButton().should("be.visible");
    cartPage.continueShoppingButton().should("be.visible");
    cartPage.removeButton().should("be.visible");
  });

  it("Should Successfully Remove An Item From The Cart Page", () => {
    //ACT
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.removeButton().click();

    //ASSERT
    cartPage.removedCartItem().should("exist");
  });

  it("Should Display Main UI On Checkout Page", () => {
    //ACT
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    //ASSERT
    checkoutPage.firstNameInput().should("be.visible");
    checkoutPage.lastNameInput().should("be.visible");
    checkoutPage.postalCodeInput().should("be.visible");
    checkoutPage.continueButton().should("be.visible");
  });

  it("Should Not Be Able to Checkout", () => {
    //ARRANGE
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    //ACT
    checkoutPage.firstNameInput().type("Joe");
    checkoutPage.lastNameInput().type("Doe");
    checkoutPage.postalCodeInput().type("24000");
    checkoutPage.continueButton().click();

    //ASSERT
    checkoutPage
      .errorContainer()
      .should("be.visible")
      .and("contain", "Error: Last Name is required");
    expect(checkoutPage.url).to.contain(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
});

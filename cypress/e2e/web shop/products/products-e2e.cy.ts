import { mockValidUser } from "../../../support/mock-user/mock-valid-user";
import "../../../support/commands";
import { mainPage } from "../../../support/pages/mainPage";
import { cartPage } from "../../../support/pages/cart";
import { checkoutPage } from "../../../support/pages/checkout";

describe("Products Standard User E2E Test", () => {
  beforeEach(() => {
    cy.login(mockValidUser.userName, mockValidUser.password);
  });

  it("Should Display Products On The Page", () => {
    //ASSERT
    mainPage.assertProductDisplay();
  });

  it("Should Display 6 Item Names, Images, Descriptions, Prices And Add To Cart Buttons", () => {
    //ASSERT
    mainPage.assertItemDetails();
  });

  it("Should Successfully Sort With Every Sort Value", () => {
    //ACT AND ASSERT
    // Custom method to get and assert sorted prices (low to high)
    mainPage.selectSortOption("lohi");

    mainPage.assertPricesSortedLowToHigh();

    // Custom method to get and assert sorted prices (high to low)
    mainPage.selectSortOption("hilo");

    mainPage.assertPricesSortedHighToLow();

    // Custom method to get and assert sorted item names (A to Z)
    mainPage.selectSortOption("az");

    mainPage.assertNamesSortedAToZ();

    // Custom method to get and assert sorted item names (Z to A)
    mainPage.selectSortOption("za");

    mainPage.assertNamesSortedZToA();
  });

  it("Should Reset App State When Clicking On It", () => {
    //ARRANGE AND ASSERT
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartNumber().should("be.visible").and("have.text", "1");

    //ACT
    mainPage.sideMenuButton().click();
    mainPage.resetAppState().click();

    //ASSERT
    mainPage.shoppingCartNumber().should("not.exist");
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
    cartPage.assertCartElements();
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
    checkoutPage.assertCheckoutFormElements();
  });

  it("Should Successfully Checkout With A Selected Item", () => {
    //ARRANGE
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    //ACT
    checkoutPage.fillOutCheckoutForm("Joe", "Doe", "24000");
    checkoutPage.continueButton().click();
    checkoutPage.finishButton().click();

    //ASSERT
    checkoutPage
      .checkoutContainer()
      .should("be.visible")
      .and("contain", "Thank you for your order!");
    checkoutPage.backHomeButton().should("be.visible");
  });

  it("Should Return The User To The Main Page When Cancelling The Order", () => {
    //ARRANGE
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    //ACT
    checkoutPage.fillOutCheckoutForm("Joe", "Doe", "24000");
    checkoutPage.cancelCheckout();

    //ASSERT
    expect(mainPage.url).to.contain("https://www.saucedemo.com/inventory.html");
  });
});

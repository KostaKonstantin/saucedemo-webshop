import { mockValidUser } from "../mock-user/mock-valid-user";
import "../../../support/commands";
import { mainPage } from "../pages/mainPage";
import { cartPage } from "../pages/cart";
import { checkoutPage } from "../pages/checkout";

describe("Products Standard User E2E Test", () => {
  beforeEach(() => {
    cy.login(mockValidUser.userName, mockValidUser.password);
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

  it("Should Successfully Sort With Every Sort Value", () => {
    /*Sort Lower To Higher Price*/
    //ACT
    mainPage.productSortContainer().select("lohi");

    mainPage
      .inventoryItemPrices()
      .invoke("text")
      .then((pricesText) => {
        const prices: number[] = pricesText
          .split("\n")
          .map((priceStr) => parseFloat(priceStr.replace("$", "")));
        const sortedPrices = [...prices].sort((a, b) => a - b);

        //ASSERT
        expect(prices).to.deep.equal(
          sortedPrices,
          "Prices should be sorted from low to high"
        );
      });

    /*Sort Higher To Lower Price*/
    //ACT
    mainPage.productSortContainer().select("hilo");

    mainPage
      .inventoryItemPrices()
      .invoke("text")
      .then((pricesText) => {
        const prices: number[] = pricesText
          .split("\n")
          .map((priceStr) => parseFloat(priceStr.replace("$", "")));
        const sortedPrices = [...prices].sort((a, b) => b - a);

        //ASSERT
        expect(prices).to.deep.equal(
          sortedPrices,
          "Prices should be sorted from high to low"
        );
      });

    /*Sort A To Z*/
    //ACT
    mainPage.productSortContainer().select("az");

    mainPage
      .inventoryItemName()
      .invoke("text")
      .then((namesText) => {
        const names: string[] = namesText.split("\n");
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

        //ASSERT
        expect(names).to.deep.equal(
          sortedNames,
          "Inventory items should be sorted from A to Z"
        );
      });

    /*Sort Z To A*/
    //ACT
    mainPage.productSortContainer().select("az");

    mainPage
      .inventoryItemName()
      .invoke("text")
      .then((namesText) => {
        const names: string[] = namesText.split("\n");
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

        //ASSERT
        expect(names).to.deep.equal(
          sortedNames,
          "Inventory items should be sorted from A to Z"
        );
      });
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

  it("Should Successfully Checkout With A Selected Item", () => {
    //ARRANGE
    mainPage.addToCartOnesie().click();
    mainPage.shoppingCartLink().click();
    cartPage.checkOutButton().click();

    //ACT
    checkoutPage.firstNameInput().type("Joe");
    checkoutPage.lastNameInput().type("Doe");
    checkoutPage.postalCodeInput().type("24000");
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
    checkoutPage.firstNameInput().type("Joe");
    checkoutPage.lastNameInput().type("Doe");
    checkoutPage.postalCodeInput().type("24000");
    checkoutPage.cancelButton().click();

    //ASSERT
    expect(mainPage.url).to.contain("https://www.saucedemo.com/inventory.html");
  });
});

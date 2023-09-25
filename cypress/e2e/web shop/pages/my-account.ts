class MyAccountPage {
  url = "https://magento.softwaretestingboard.com/customer/account/";

  successfulMessage() {
    return cy.get('[data-ui-id="message-success"]');
  }

  contactInformationBox() {
    return cy.get(".box.box-information");
  }

  customerMenuToggle() {
    return cy.get('span[aria-expanded="false"]');
  }

  signOutLink() {
    return cy.get(
      'a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]'
    );
  }

  signOutText() {
    return cy.get(
      ":nth-child(2) > .customer-welcome > .customer-name > .action"
    );
  }
}

export const myAccountPage = new MyAccountPage();

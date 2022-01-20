// app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("agile manifesto testing", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });

  it("displays tree grid", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get(".p-treetable").should("have.descendants", ".p-treetable-header");
    cy.get(".p-treetable").should("have.descendants", ".p-treetable-wrapper");
    cy.get(".p-treetable").should(
      "have.descendants",
      ".p-paginator.p-component.p-paginator-bottom"
    );
    cy.get(".p-treetable-tbody").should("have.descendants", "tr");
    cy.get(".p-treetable-tbody > tr:nth-child(1) > td:nth-child(1)").should(
      "have.text",
      "10 Oct to 07 Feb 2002"
    );
    cy.get(
      ".p-treetable-tbody > tr:nth-child(1) > td:nth-child(1) > button"
    ).click();
    cy.get(".p-treetable-tbody > tr:nth-child(2) > td:nth-child(3)").should(
      "have.text",
      "Chet Hendrickson"
    );
    cy.get(".p-treetable-tbody > tr:nth-child(2) > td:nth-child(4) > a").should(
      "have.attr",
      "href"
    );
    cy.get(
      ".p-treetable-tbody > tr:nth-child(2) > td:nth-child(4) > a"
    ).click();

    cy.get(".p-paginator-last.p-paginator-element.p-link").click();
  });
});

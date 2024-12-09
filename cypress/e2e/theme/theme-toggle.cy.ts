// Light/Dark mode toggle

describe("Theme Customization", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("cityslicka");
    cy.get('button[type="submit"]').click();

    // Ensure we're on the dashboard
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("Toggles between light and dark themes", () => {
    // Alias the toggle button
    cy.get('button[aria-label="Toggle theme"]').as("themeToggle");

    // Check the initial theme
    cy.get("html").then((html) => {
      if (html.hasClass("light")) {
        // Toggle to dark
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "dark");

        // Toggle back to light
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "light");
      } else {
        // Toggle to light
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "light");

        // Toggle back to dark
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "dark");
      }
    });
  });

  it("Persists theme selection across sessions", () => {
    // Alias the toggle button
    cy.get('button[aria-label="Toggle theme"]').as("themeToggle");

    // Check the initial theme and proceed dynamically
    cy.get("html").then((html) => {
      if (html.hasClass("light")) {
        // Switch to dark
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "dark");

        // Reload the page and verify persistence
        cy.reload();
        cy.get("html").should("have.class", "dark");

        // Switch back to light
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "light");

        // Reload the page and verify persistence
        cy.reload();
        cy.get("html").should("have.class", "light");
      } else {
        // Switch to light
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "light");

        // Reload the page and verify persistence
        cy.reload();
        cy.get("html").should("have.class", "light");

        // Switch back to dark
        cy.get("@themeToggle").click();
        cy.get("html").should("have.class", "dark");

        // Reload the page and verify persistence
        cy.reload();
        cy.get("html").should("have.class", "dark");
      }
    });
  });
});

// Log In

describe("Log In Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Displays the login form", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').contains("Log In").should("be.visible");
  });

  it("Displays error on invalid credentials", () => {
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("WrongPassword");
    cy.get('button[type="submit"]').click();

    cy.contains("user not found").should("be.visible"); // Adjust based on actual error message
  });

  it("Successfully logs in a user and redirects to dashboard", () => {
    // Use valid credentials as per reqres.in's mock API
    const validEmail = "eve.holt@reqres.in";
    const validPassword = "cityslicka";

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    // Check redirection to dashboard
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains(`Dashboard`).should("be.visible");

    // Check if token is stored (localStorage)
    cy.window().then((window) => {
      const token = window.localStorage.getItem("authToken");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(token).to.exist;
    });
  });
});

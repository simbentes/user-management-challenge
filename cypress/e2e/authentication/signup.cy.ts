// Sign Up

describe("Sign Up Flow", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("Displays the sign-up form", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get('button[type="submit"]').contains("Sign Up").should("be.visible");
  });

  it("Validates password confirmation", () => {
    cy.get('input[name="password"]').type("Password123");
    cy.get('input[name="confirmPassword"]').type("DifferentPassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Passwords do not match").should("be.visible");
  });

  it("Successfully signs up a user and redirects to dashboard", () => {
    const userEmail = "charles.morris@reqres.in"; // One of the emails from reqres

    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type("Password123");
    cy.get('input[name="confirmPassword"]').type("Password123");
    cy.get('button[type="submit"]').click();

    // Check redirection to dashboard
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains(`Dashboard`).should("be.visible");

    // Check if token is stored (localStorage)
    cy.window().then((window) => {
      const token = window.localStorage.getItem("authToken");
      expect(token).to.exist;
    });
  });
});

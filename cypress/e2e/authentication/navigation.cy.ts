describe("Navigation Between Sign-in and Sign-up Pages", () => {
  it("navigates from Sign-in to Sign-up via header", () => {
    cy.visit("/login");
    cy.get('[data-testid="signup-button-header"]').click();
    cy.url().should("include", "/signup");
    cy.contains("Sign Up");
  });

  it("navigates from Sign-in to Sign-up via header", () => {
    cy.visit("/login");
    cy.get('[data-testid="signup-button-header"]').click();
    cy.url().should("include", "/signup");
    cy.contains("Sign Up");
  });

  it("navigates from Sign-up to Sign-in via description link", () => {
    cy.visit("/signup");
    cy.get('[data-testid="login-link"]').click();
    cy.url().should("include", "/login");
    cy.contains("Log In");
  });

  it("navigates from Sign-up to Sign-in via description link", () => {
    cy.visit("/signup");
    cy.get('[data-testid="login-link"]').click();
    cy.url().should("include", "/login");
    cy.contains("Log In");
  });
});

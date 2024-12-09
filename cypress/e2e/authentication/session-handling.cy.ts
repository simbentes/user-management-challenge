describe("Session Handling", () => {
  it("redirects to sign up if session do not exists", () => {
    cy.visit("/");
    cy.url().should("include", "/signup");
    cy.contains("Sign Up");
  });

  it("redirects to dashboard if session exists", () => {
    cy.window().then((window) => {
      window.localStorage.setItem("authToken", "fake-token");
    });
    cy.visit("/login");
    cy.url().should("include", "/");
    cy.contains("Dashboard");
  });

  it("clears session on logout", () => {
    cy.window().then((window) => {
      window.localStorage.setItem("authToken", "fake-token");
    });
    cy.visit("/");
    cy.get('[aria-label="Log out session"]').click();
    cy.url().should("include", "/signup");
    cy.window().then((window) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(window.localStorage.getItem("authToken")).to.be.null;
    });
  });
});

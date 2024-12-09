describe("User Management Dashboard", () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit("/login");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("cityslicka");
    cy.get('button[type="submit"]').click();

    // Ensure we're on the dashboard
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("Displays a list of users", () => {
    cy.get('[data-testid="user-list"]').should("be.visible");
    cy.get('[data-testid="user-item"]').should("have.length", 6);
  });

  it("Creates a new user", () => {
    cy.get('button[data-testid="create-user-button"]').click();
    cy.get("#first_name").type("Simao");
    cy.get("#last_name").type("Bentes");
    // Generate a unique email and store it in a variable
    const uniqueEmail = `simao${Date.now()}@example.com`;
    cy.get("#email").type(uniqueEmail);
    cy.get('button[data-testid="create-user-button-dialog"]').click();

    // Check for success message
    cy.contains("User created").should("be.visible");

    // Verify the user appears in the list
    cy.get('[data-testid="user-item"]')
      .last()
      .within(() => {
        cy.contains("Simao Bentes").should("be.visible");
        cy.contains(uniqueEmail).should("be.visible");
      });
  });

  it("Edits an existing user", () => {
    // Select the first user in the list
    cy.get('[data-testid="user-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="users-action-menu"]').click();
      });

    cy.get('div[data-testid="edit-user-button"]').click();

    // Ensure the edit form is visible
    cy.contains("Edit user").should("be.visible");

    // Update user details
    cy.get("input#first_name").clear().type("Miguel");
    cy.get("input#last_name").clear().type("Duarte");

    // Generate a unique email and store it in a variable
    const uniqueEmail = `simao${Date.now()}@example.com`;
    cy.get("input#email").clear().type(uniqueEmail);

    cy.get('button[data-testid="save-changes-button"]').click();

    // Check for success message
    cy.contains("User updated").should("be.visible");

    // Verify the updated details
    cy.get('[data-testid="user-item"]')
      .first()
      .within(() => {
        cy.contains("Miguel Duarte").should("be.visible");
        cy.contains(uniqueEmail).should("be.visible");
      });
  });

  it("Deletes a user", () => {
    // Get the initial count of users
    cy.get('[data-testid="user-item"]').then((users) => {
      const initialCount = users.length;

      // Select the last user in the list
      cy.get('[data-testid="user-item"]')
        .last()
        .within(() => {
          cy.get('[data-testid="users-action-menu"]').click();
        });

      cy.get('div[data-testid="delete-user-button"]').click();

      // Confirm deletion in the dialog
      cy.get('button[data-testid="confirm-delete-button"]').click();

      // Check delete toast
      cy.contains("User deleted").should("be.visible");

      // Verify the user count has decreased by one
      cy.get('[data-testid="user-item"]').should("have.length", initialCount - 1);
    });
  });

  it("Handles pagination correctly", () => {
    cy.get('button[data-testid="next-page-button"]').click();
    cy.contains("Page 2 of").should("be.visible");
    cy.get('[data-testid="user-item"]').should("have.length.at.most", 6);

    cy.get('button[data-testid="previous-page-button"]').click();
    cy.contains("Page 1 of").should("be.visible");
    cy.get('[data-testid="user-item"]').should("have.length.at.most", 6);
  });
});

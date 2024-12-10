# User Management System

This is a React-based application designed as a user management system. It supports user registration, login, user management functionalities (create, update, delete users), theme customization, and automated testing.

## Features

1. **Authentication:**

   - User registration and login.
   - Session handling with token-based authentication.

2. **User Management Dashboard:**

   - List users with pagination (6 users per page).
   - Create, update, and delete users.

3. **Theme Customization:**

   - Switch between light and dark themes.
   - Theme preference persists across sessions.

4. **Automated Testing:**
   - Includes Cypress tests for login, signup, session handling, navigation, and user management.

## Project Setup

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/simbentes/user-management-challenge
   cd user-management-challenge
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:3000`.

---

## Docker Setup

### Build the Docker Image

1. Build the Docker image:
   ```bash
   docker build -t user-management-app .
   ```

### Run the Docker Container

2. Run the container:

   ```bash
   docker run -d -p 3000:80 user-management-app
   ```

3. Open your browser and visit `http://localhost:3000`.

---

## Project Structure

```
src/
├── api/               # Axios configuration
├── components/        # Reusable UI components
├── pages/             # Application pages (Login, Signup, Dashboard)
├── store/             # State management (Auth, Theme, User Contexts)
├── tests/             # Cypress tests
├── utils/             # Utility functions
└── main.tsx           # Entry point
```

---

## Testing

Run automated tests with Cypress:

```bash
pnpm cypress open
```

---

## Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **State Management:** React Context API
- **Testing:** Cypress
- **Containerization:** Docker, Nginx

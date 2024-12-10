# User Management System

## Project Setup

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

## Testing

Run automated tests with Cypress:

```bash
pnpm cypress open
```

## Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **State Management:** React Context API
- **Testing:** Cypress
- **Containerization:** Docker, Nginx

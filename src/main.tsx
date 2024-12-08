import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { LoginPage } from "./pages/login/LoginPage.tsx";
import { SignUpPage } from "./pages/signup/SignUpPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import { StrictMode } from "react";
import { AuthProvider } from "./store/auth.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import { UserProvider } from "./store/user.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);

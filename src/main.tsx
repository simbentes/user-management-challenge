import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { LoginPage } from "./pages/login/LoginPage.tsx";
import { SignUpPage } from "./pages/signup/SignUpPage.tsx";
import ProtectedRoute from "./routes/ProtectdRoute.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />} />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (newToken: string) => void;
  logout: () => void;
}

const defaultValue: AuthContextProps = {
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    //Verify if token is saved on mounting
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    // Update context state
    setTokenState(newToken);

    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>{children}</AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};

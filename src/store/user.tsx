import React, { createContext, useReducer, useContext, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "EDIT_USER"; payload: User }
  | { type: "DELETE_USER"; payload: number };

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

// Reducer function
const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER": {
      const newId =
        state.users.length > 0 ? Math.max(...state.users.map((user) => user.id)) + 1 : 1; // If there are no users, start with id = 1
      const newUser = { ...action.payload, id: newId };

      return { ...state, users: [...state.users, newUser] };
    }
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
      };
    case "DELETE_USER":
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    default:
      throw new Error(`Unhandled action type.`);
  }
};

interface UserContextValue {
  state: UserState;
  dispatch: React.Dispatch<Action>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

// UserProvider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

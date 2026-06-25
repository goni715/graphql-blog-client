import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Some initial mock users
const INITIAL_USERS: User[] = [
  { id: "12", name: "Manik Islam", email: "manik@gmail.com" },
  { id: "15", name: "Sarah Connor", email: "sarah@example.com" },
  { id: "20", name: "John Doe", email: "john@example.com" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("registered_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem("registered_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("current_user");
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Artificial delay for premium network feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    // For mock login, we check if the user exists and let them in if password is at least 6 chars
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user && password.length >= 6) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password.length < 6) return false;

    // Check if email already registered
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return false;
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 1000).toString(),
      name,
      email,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

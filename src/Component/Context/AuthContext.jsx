import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import { mockUsers, mockAdmins } from "../lib/mockData";

const AuthContext = createContext(undefined);

// Generate unique membership ID
const generateMembershipId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `MEM-${year}-${randomNum}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;
  const role = user ? user.role : null;

  const login = useCallback(async (credentials, loginType) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (loginType === "user") {
      const foundUser = mockUsers.find(
        (u) => u.membershipId === credentials.identifier
      );

      if (!foundUser) {
        return { success: false, error: "Invalid Membership ID" };
      }

      if (credentials.password !== "password123") {
        return { success: false, error: "Invalid password" };
      }

      setUser(foundUser);
      localStorage.setItem("auth_user", JSON.stringify(foundUser));
      return { success: true };
    } else {
      const foundAdmin = mockAdmins.find(
        (a) =>
          a.email === credentials.identifier && a.role === loginType
      );

      if (!foundAdmin) {
        return { success: false, error: "Invalid email or role" };
      }

      if (credentials.password !== "admin123") {
        return { success: false, error: "Invalid password" };
      }

      setUser(foundAdmin);
      localStorage.setItem("auth_user", JSON.stringify(foundAdmin));
      return { success: true };
    }
  }, []);

  const register = useCallback(async (data) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = mockUsers.find(
      (u) => u.email === data.email
    );

    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    const membershipId = generateMembershipId();

    const newUser = {
      id: `user-${Date.now()}`,
      membershipId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      role: "user",
      membershipStatus: "pending",
      joinDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));

    return { success: true, membershipId };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const forgotPassword = useCallback(async (email) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userExists = mockUsers.find((u) => u.email === email);
    const adminExists = mockAdmins.find((a) => a.email === email);

    if (!userExists && !adminExists) {
      return {
        success: false,
        error: "Email not found in our records",
      };
    }

    return { success: true };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

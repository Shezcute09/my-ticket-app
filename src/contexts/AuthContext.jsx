import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("ticketapp_session");
    if (token) {
      const userData = JSON.parse(
        localStorage.getItem("ticketapp_user") || "{}"
      );
      setUser(userData);
    }
    setLoading(false);
  }, []);

  // Helper function to get all users from localStorage
  const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  };

  // Helper function to save users to localStorage
  const saveUser = (userData, password) => {
    const users = getStoredUsers();
    const existingUserIndex = users.findIndex(
      (u) => u.email === userData.email
    );

    if (existingUserIndex >= 0) {
      // Update existing user
      users[existingUserIndex] = { ...userData, password };
    } else {
      // Add new user
      users.push({ ...userData, password });
    }

    localStorage.setItem("ticketapp_users", JSON.stringify(users));
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // Remove password from user object before storing in session
          const { password: _, ...userWithoutPassword } = user;

          const token = Math.random().toString(36).substring(2);
          localStorage.setItem("ticketapp_session", token);
          localStorage.setItem(
            "ticketapp_user",
            JSON.stringify(userWithoutPassword)
          );
          setUser(userWithoutPassword);
          resolve(userWithoutPassword);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  const signup = async (email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation
        if (password !== confirmPassword) {
          reject(new Error("Passwords do not match"));
          return;
        }

        if (password.length < 6) {
          reject(new Error("Password must be at least 6 characters"));
          return;
        }

        if (!email) {
          reject(new Error("Email is required"));
          return;
        }

        // Check if user already exists
        const users = getStoredUsers();
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          reject(new Error("User already exists with this email"));
          return;
        }

        const userData = {
          id: Date.now(),
          email,
          name: email.split("@")[0],
        };

        // Save user with password to our "database"
        saveUser(userData, password);

        // Create session (without password)
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("ticketapp_session", token);
        localStorage.setItem("ticketapp_user", JSON.stringify(userData));
        setUser(userData);
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_user");
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

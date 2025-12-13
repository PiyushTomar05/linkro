import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a logged-in user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("linkro_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // MOCK LOGIN LOGIC
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let mockUser = null;
        if (email.includes("admin")) mockUser = { name: "Admin User", email, role: "admin" };
        else if (email.includes("agent")) mockUser = { name: "Agent User", email, role: "agent" };
        else if (email.includes("recruiter")) mockUser = { name: "Recruiter User", email, role: "recruiter" };
        
        if (mockUser) {
          setUser(mockUser);
          localStorage.setItem("linkro_user", JSON.stringify(mockUser));
          setLoading(false);
          resolve(mockUser);
        } else {
          setLoading(false);
          reject(new Error("Invalid credentials. Try 'admin@test.com'"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("linkro_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

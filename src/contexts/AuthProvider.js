import axios from "../lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMe() {
    const res = await axios.get("/users/me");
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function login(email, password) {
    await axios.post("/auth/login", {
      email,
      password,
    });
    await getMe();
  }
  async function logout() {}

  async function updateMe(FormData) {
    const res = await axios.patch("/users/me", FormData);
    const nextUser = res.data;
    setUser(nextUser);
  }

  //   useEffect(() => {
  //     getMe();
  //   }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider");
  }
  return context;
}

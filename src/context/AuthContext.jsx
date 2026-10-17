import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, configured } from "../services/firebase.js";
const C = createContext(null);
const demoAdmin = { uid: "demo-admin", email: "demo@atelier.local" };
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
      !configured && sessionStorage.getItem("atelier-demo-admin") === "true" ? demoAdmin : null,
    ),
    [ready, setReady] = useState(!configured);
  useEffect(
    () =>
      configured
        ? onAuthStateChanged(auth, (u) => {
            setUser(u);
            setReady(true);
          })
        : undefined,
    [],
  );
  const login = (username, password) => {
    if (!configured) {
      if (username.trim() === "studio-admin" && password === "atelier123") {
        sessionStorage.setItem("atelier-demo-admin", "true");
        setUser(demoAdmin);
        return Promise.resolve({ user: demoAdmin });
      }
      return Promise.reject(new Error("Invalid demo username or password."));
    }
    const configuredUsername = (import.meta.env.VITE_ADMIN_USERNAME || "").trim();
    const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || "").trim();
    const email = configuredUsername && username.trim() === configuredUsername
      ? configuredEmail
      : username.includes("@") ? username.trim() : "";
    if (!email) throw new Error("Configure the admin username and Firebase email in .env.local.");
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    if (!configured) {
      sessionStorage.removeItem("atelier-demo-admin");
      setUser(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };
  const admins = (import.meta.env.VITE_ALLOWED_ADMIN_UIDS || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  return (
    <C.Provider
      value={{
        user,
        ready,
        login,
        logout,
        isAdmin: !!user && (configured ? admins.includes(user.uid) : user.uid === demoAdmin.uid),
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useAuth = () => useContext(C);

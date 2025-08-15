import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type User = { id: string; email: string; name: string; score: number };
type Decoded = { id: string; email: string; name: string; exp: number };

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const d = jwtDecode<Decoded>(token);
        if (d.exp * 1000 > Date.now()) {
          const cached = localStorage.getItem("user");
          if (cached) setUser(JSON.parse(cached));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        // invalid token, ignore
      }
    }
  }, []);

  function login(token: string, user: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  function authHeader() {
    const t = localStorage.getItem("token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  }

  return { user, login, logout, authHeader };
}

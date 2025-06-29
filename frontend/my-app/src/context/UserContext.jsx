// src/context/UserContext.jsx
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axiosInstance.get("/dj-rest-auth/user/")
        .then((res) => {
          console.log("✅ User loaded:", res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.error("❌ Error fetching user:", err);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("🚫 No token found");
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

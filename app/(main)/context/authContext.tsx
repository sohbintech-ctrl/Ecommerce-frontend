"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. User type
type User = {
  name: string;
  email: string;
  role: string;
} | null;

// 2. Context type
type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => Promise<void>;
};

// 3. Context create
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Provider
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>(null);

 //get profile if session is there.
  const checkUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        setUser(data.user); // login restore
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

   useEffect(() => {
  checkUser();
}, []);


  //logout
  const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, setUser ,logout}}>
      {children}
    </AuthContext.Provider> 
  );
};

// 5. Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
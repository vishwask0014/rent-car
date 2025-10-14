"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useParams, usePathname, useRouter } from "next/navigation";
import LoadingScreen from "../components/Common/LoadingScreen";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const currentRoute = usePathname();

  console.log(user, "user context api");

  useEffect(() => {
    const UnSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => UnSubscribe();
  });

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth).then(() => {
      route.push("/login");
    });
  };

  // route protection
  // useEffect(() => {
  //   if (currentRoute !== "/") return route.push("/login");
  //   if (!user) return route.push("/login");
  // }, [!user]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <AuthContext.Provider
        value={{ user, loading, email, password, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

// context auth api  hook

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "../components/Common/LoadingScreen";
import { get, ref } from "firebase/database";

const AuthContext = createContext({});

type CarDetail = {
  id: string | number;
  carName?: string;
  title?: string;
  brand?: string;
  manufacturingYear?: string;
  kmDriven?: string;
  fuelType?: string;
  transmission?: string;
  segament?: string;
  hourlyPrice?: string | number;
  numberOfGear?: string;
  gallaryArray?: string[];
  description?: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarDetail[]>([]);
  const route = useRouter();
  // const currentRoute = usePathname();
  const dbRef = ref(db, "carDetails/");

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

  useEffect(() => {
    async function getData() {
      const snapShot = await get(dbRef);
      const listing = snapShot.val();

      if (!listing || typeof listing !== "object") {
        console.log("no listing present");
        setData([]);
      } else {
        const normalized: CarDetail[] = Object.entries(
          listing as Record<string, unknown>
        ).map(([key, value]) => ({
          id: key,
          ...(value as Partial<CarDetail>),
        }));
        setData(normalized);
      }
    }
    getData();
  }, [dbRef]);

  if (loading) return <LoadingScreen />;
  return (
    <>
      <AuthContext.Provider
        value={{ user, loading, email, password, login, logout, data }}
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

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

function Page() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, userName, password);
      alert(user.user.email + "Welcome");
      router.push("/");
    } catch (error) {}
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-12 lg:px-16">
        <div className="p-4 bg-white  grid lg:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl p-12 shadow-md lg:min-h-[280px] lg:h-full bg-(--primary) relative">
            <Image
              src="/static/img/cartyrepattern.svg"
              alt="login"
              fill
              className="object-cover"
            />

            <div className="max-w-[686px]">
              <h1 className="text-white font-bold leading-[1] text-4xl sm:text-5xl lg:text-[42px] lg:leading-[1.1] mb-6">
                Experience the road like never before
              </h1>
              <p className="text-white text-base sm:text-lg mb-8 lg:max-w-[464px] w-full">
                Sign in to unlock member-only deals: up to 30% off weekend
                rentals, free upgrades on select models, flexible pick-up, and
                zero-fee cancellations. Choose from economy to SUVs—fully
                inspected and ready to go.
              </p>
            </div>
          </div>
          <div className="p-6 max-w-[620px] w-full mx-auto">
            <div className="form-container mb-8">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-container mb-8 ">
              <label>Password</label>
              <input
                type="text"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              className="btnPrimary w-full max-w-[320px] mt-10 mx-auto block"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

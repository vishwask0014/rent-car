"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import IconContainer from "../IconContainer";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext() as any;

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
        console.log("logout success");
      })
      .catch((error) => {
        console.log("logout error", error); 
      });
  };

  const actveMenu = user ? isLoginMenuLink : menuLink;

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="w-full flex justify-between items-center py-4 container mx-auto px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="w-[140px] lg:w-auto flex items-center gap-2">
          <IconContainer name="logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {actveMenu.map((i, index) => (
            <Link
              key={index}
              href={i.slug}
              className="text-gray-800 hover:text-black transition-all ease-in-out duration-300 font-medium"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Contact Section (Desktop) */}
          <Link
            href="tel:+9962471680"
            className="hidden md:flex items-center gap-3 hover:opacity-80"
          >
            <div className="text-sm leading-tight">
              <span className="block text-gray-500">Need help?</span>
              <span className="font-semibold text-black">+996 247-1680</span>
            </div>
            <div className="bg-(--primary) w-10 h-10 rounded-full flex justify-center items-center">
              <FaPhoneAlt className="text-white" />
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-700"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            title={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {user && (
            <button
              title="logout"
              type="button"
              className="text-sm leading-tight cursor-pointer btnPrimary"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}
        </div>
      </div>

      {/* Backdrop (Mobile) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-16 left-4 right-4 z-50 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-start px-5 gap-6 py-6 rounded-xl border bg-white shadow-lg">
          {actveMenu.map((i, index) => (
            <Link
              key={index}
              href={i.slug}
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-black text-lg font-medium"
            >
              {i.label}
            </Link>
          ))}

          {/* Contact (Mobile) */}
          <Link
            href="tel:+9962471680"
            className="flex items-center gap-3 hover:opacity-80"
            onClick={() => setIsOpen(false)}
          >
            <div className="bg-(--primary) w-10 h-10 rounded-full flex justify-center items-center">
              <FaPhoneAlt className="text-white" />
            </div>
            <div className="text-sm leading-tight">
              <span className="block text-gray-500">Need help?</span>
              <span className="font-semibold text-black">+996 247-1680</span>
            </div>
          </Link>

          {/* Auth Action (Mobile) */}
          {user ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="btnPrimary w-full"
              title="Logout"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="btnPrimary w-full text-center"
              onClick={() => setIsOpen(false)}
              title="Login"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

const menuLink = [
  { label: "Home", slug: "/" },
  { label: "Vehicles", slug: "/vehicles" },
  { label: "Login", slug: "/login" },
];

const isLoginMenuLink = [
  { label: "Home", slug: "/" },
  { label: "Vehicles", slug: "/vehicles" },
  { label: "Posting", slug: "/posting" },
];

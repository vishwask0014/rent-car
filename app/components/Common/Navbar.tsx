"use client";

import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import IconContainer from "../IconContainer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="w-full flex justify-between items-center py-4 container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <IconContainer name="logo" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuLink.map((i, index) => (
            <Link
              key={index}
              href={i.slug}
              className="text-gray-800 hover:text-black transition-all ease-in-out duration-300 font-medium"
            >
              {i.label}
            </Link>
          ))}
        </nav>

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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-white shadow-md border-t ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-start px-5 gap-6 py-6">
          {menuLink.map((i, index) => (
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
        </nav>
      </div>
    </header>
  );
}

const menuLink = [
  { label: "Home", slug: "/" },
  { label: "Vehicles", slug: "/vehicles" },
  { label: "Details", slug: "/details" },
  { label: "About Us", slug: "/about" },
  { label: "Contact Us", slug: "/contact" },
];

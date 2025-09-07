"use client";

import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import IconContainer from "../IconContainer";

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="w-full flex justify-between items-center py-4 container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <IconContainer name="logo" />
        </div>

        {/* Menu Links */}
        <nav className="flex gap-8 items-center">
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

        {/* Contact Section */}
        <Link
          href="tel:+9962471680"
          className="flex items-center gap-3 hover:opacity-80"
        >
          <div className="text-sm leading-tight">
            <span className="block text-gray-500">Need help?</span>
            <span className="font-semibold text-black">+996 247-1680</span>
          </div>

          <div className="bg-(--primary) w-10 h-10 rounded-full flex justify-center items-center">
            <FaPhoneAlt className="text-white" />
          </div>
        </Link>
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

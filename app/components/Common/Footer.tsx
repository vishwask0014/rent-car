"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaXTwitter,
} from "react-icons/fa6";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import IconContainer from "../IconContainer";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto px-4">
        <UpperBar />
        <BottomBar />
      </div>

      {/* Copyright text */}
      <div className="text-center py-8">
        © Copyright Car Rental 2024. Design by Figma.guru
      </div>
    </footer>
  );
}

const UpperBar = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between py-10 lg:py-20">
        {/* Logo + About */}
        <div className="md:col-span-1">
          <IconContainer name="logo" />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-(--secondary) text-white w-10 h-10 rounded-full flex justify-center items-center">
              <MdLocationOn size={20} />
            </div>
            <div>
              <h4 className="text-sm">Address</h4>
              <p className="font-semibold text-sm text-gray-800">
                Oxford Ave. Cary, NC 27511
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-(--secondary) text-white w-10 h-10 rounded-full flex justify-center items-center">
              <MdEmail size={20} />
            </div>
            <div>
              <h4 className="text-sm">Email</h4>
              <p className="font-semibold  text-sm text-gray-800">
                nwiger@yahoo.com
              </p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-(--secondary) text-white w-10 h-10 rounded-full flex justify-center items-center">
              <MdPhone size={20} />
            </div>
            <div>
              <h4 className="text-sm">Phone</h4>
              <p className="font-semibold text-sm text-gray-800">
                +537 547-6401
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BottomBar = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-[280px]">
            Faucibus faucibus pellentesque dictum turpis. Id pellentesque turpis
            massa a id iaculis lorem t...
          </p>
          <SocailLinks />
        </div>

        <div>
          <h4 className="font-semibold mb-4">Download App</h4>
          <ul>
            {usefulLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Download App</h4>

          <ul>
            {vehicleLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Download App */}
          <div className="space-y-3">
            <h4 className="font-semibold">Download App</h4>
            <div className="flex flex-col gap-3">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29_SVG.svg"
                alt="App Store"
                width={150}
                height={45}
                className="cursor-pointer"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width={150}
                height={45}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SocailLinks = () => {
  return (
    <>
      <div className="flex gap-4 text-lg text-gray-600">
        <FaFacebookF className="cursor-pointer hover:text-(--primary)" />
        <FaInstagram className="cursor-pointer hover:text-(--primary)" />
        <FaXTwitter className="cursor-pointer hover:text-(--primary)" />
        <FaTwitter className="cursor-pointer hover:text-(--primary)" />
      </div>
    </>
  );
};

const useFullLink = () => {};

const usefulLinks = [
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "F.A.Q", href: "/faq" },
];

const vehicleLinks = [
  { label: "Sedan", href: "/vehicles/sedan" },
  { label: "Cabriolet", href: "/vehicles/cabriolet" },
  { label: "Pickup", href: "/vehicles/pickup" },
  { label: "Minivan", href: "/vehicles/minivan" },
  { label: "SUV", href: "/vehicles/suv" },
];

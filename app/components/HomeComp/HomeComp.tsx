"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import IconContainer from "../IconContainer";
import FunctionCard from "../Common/FunctionCard";
import Link from "next/link";
import { db } from "@/app/firebase";
import { get, ref } from "firebase/database";

export function HeroSection() {
  const CarType = [
    { value: "sedan", label: "Sedan" },
    { value: "sports", label: "Sports" },
    { value: "suv", label: "SUV" },
    { value: "van", label: "Van" },
  ];

  // removed unused example options

  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <div className="relative container mx-auto px-4 sm:px-6">
      <div
        className="p-6 sm:px-8 py-14 bg-(--primary) rounded-2xl mt-6 lg:mt-8 flex flex-col gap-6 sm:gap-8 items-center justify-between lg:flex-row"
        style={{ backgroundImage: "url('/static/img/cartyrepattern.svg')" }}
      >
        {/* Left Side */}
        <div className="max-w-[600px] w-full">
          <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl lg:text-[60px] mb-4 sm:mb-6">
            Experience the road like never before
          </h1>
          <p className="text-white/80 mb-6 sm:mb-8 lg:max-w-[464px] w-full text-base sm:text-lg">
            Drive your way and save: weekend specials up to 30% off, daily rates
            from ₹999, free cancellations, and instant pick‑up. Sedans, SUVs, and
            more—cleaned, inspected, and ready.
          </p>
          {/* <button className="w-full xs:w-fit bg-(--secondary) text-white text-base py-2.5 px-6 rounded-xl font-semibold">
            View all cars
          </button> */}
        </div>

        {/* Booking Card */}
        {/* <div className="bg-white max-w-[416px] w-full rounded-2xl p-5 sm:p-6 shadow-lg">
          <h2 className="font-semibold text-black text-center text-2xl mb-6">
            Book your car
          </h2>

          <div className="flex flex-col gap-4">
            <Select
              placeholder="Select Car Type"
              defaultValue={selectedOption}
              onChange={(option) =>
                setSelectedOption(
                  option as { value: string; label: string } | null
                )
              }
              options={CarType}
            />

            <Select
              placeholder="Place of rental"
              defaultValue={selectedOption}
              onChange={(option) =>
                setSelectedOption(
                  option as { value: string; label: string } | null
                )
              }
              options={CarType}
            />

            <Select
              placeholder="Place of return"
              defaultValue={selectedOption}
              onChange={(option) =>
                setSelectedOption(
                  option as { value: string; label: string } | null
                )
              }
              options={CarType}
            />

            <input
              placeholder="Rental Date"
              type="date"
              className="py-2.5 rounded-xl bg-(--gray) px-4 min-h-[44px] text-sm"
            />

            <input
              placeholder="Return Date"
              type="date"
              className="py-2.5 rounded-xl bg-(--gray) px-4 min-h-[44px] text-sm"
            />

            <button className="bg-(--secondary) text-white font-semibold text-base rounded-xl py-3 mt-6 w-full">
              Book Now
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

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

export function DetailCard() {
  const [data, setData] = useState<CarDetail[]>([]);
  const dbRef = ref(db, "carDetails/");

  useEffect(() => {
    async function GetData() {
      const snapShot = await get(dbRef);
      const listing = snapShot.val();

      if (!listing || typeof listing !== "object") {
        console.error("No listing present");
        setData([]);
      } else {
        // preserve keys as ids
        const normalized: CarDetail[] = Object.entries(
          listing as Record<string, unknown>
        ).map(([key, value]) => ({
          id: key,
          ...(value as Partial<CarDetail>),
        }));
        setData(normalized);
      }
    }
    GetData();
  }, [dbRef]);

  return (
    <>
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="relative py-10 lg:py-20">
          <div className="flex justify-between mb-8 lg:mb-10">
            <h2 className="text-center lg:text-left text-3xl font-bold">
              Choose the car that <br className="hidden lg:block" />
              suits you
            </h2>

            {data.length >= 4 && (
              <Link
                href="/all-cars"
                className="flex items-center gap-2 font-black text-base"
              >
                View All <IconContainer name="chevronRight" />
              </Link>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((car) => (
              <FunctionCard
                data={{
                  id: String(car.id),
                  carName: car.carName || "-",
                  brand: car.brand || "-",
                  manufacturingYear: car.manufacturingYear || "-",
                  kmDriven: car.kmDriven || "-",
                  fuelType: car.fuelType || "-",
                  transmission: car.transmission || "-",
                  segament: car.segament || "-",
                  hourlyPrice: String(car.hourlyPrice ?? "-"),
                  numberOfGear: car.numberOfGear || "-",
                  gallaryArray: car.gallaryArray || [],
                  description: car.description || "-",
                }}
                key={car.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

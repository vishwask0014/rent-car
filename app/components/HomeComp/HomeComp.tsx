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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <div className="relative container mx-auto">
      <div
        className="p-8 bg-(--primary) rounded-2xl mt-6 lg:mt-8 flex flex-col gap-8 items-center justify-between lg:flex-row"
        style={{ backgroundImage: "url('/static/img/cartyrepattern.svg')" }}
      >
        {/* Left Side */}
        <div className="max-w-[686px]">
          <h1 className="text-white font-bold leading-[1] text-[60px] mb-6">
            Experience the road like never before
          </h1>
          <p className="text-white mb-8 lg:max-w-[464px] w-full">
            Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor
            tristique et gravida. Quis nunc interdum gravida ullamcorper
          </p>
          <button className="w-fit bg-(--secondary) text-white text-base py-2 px-6 rounded-xl font-semibold">
            View all cars
          </button>
        </div>

        {/* Booking Card */}
        <div className="bg-white max-w-[416px] w-full rounded-2xl p-6 shadow-lg">
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
              className="py-2 rounded-xl bg-(--gray) px-4 min-h-[38px] text-sm"
            />

            <input
              placeholder="Return Date"
              type="date"
              className="py-2 rounded-xl bg-(--gray) px-4 min-h-[38px] text-sm"
            />

            <button className="bg-(--secondary) text-white font-semibold text-base rounded-xl py-3 mt-6">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type CarDetail = {
  id: string | number;
  carName?: string;
  brand?: string;
  manufacturingYear?: string;
  kmDriven?: string;
  fuelType?: string;
  transmission?: string;
  segament?: string;
  hourlyPrice?: string | number;
  gallaryArray?: string[];
};

export function DetailCard() {
  const [data, setData] = useState<CarDetail[]>([]);
  const dbRef = ref(db, "carDetails/");

  useEffect(() => {
    async function GetData() {
      const snapShot = await get(dbRef);
      const listing = snapShot.val();

      if (!listing) {
        console.error("No listing present");
        setData([]);
      } else {
        // preserve keys as ids
        const normalized: CarDetail[] = Object.entries(listing).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );
        setData(normalized);
      }
    }

    GetData();
  }, [dbRef]);

  console.log(data, "data>>>>");

  return (
    <>
      <div className="container mx-auto relative py-10 lg:py-20">
        <div className="flex justify-between mb-8 lg:mb-10">
          <h2 className="text-center lg:text-left text-3xl font-bold">
            Choose the car that <br className="hidden lg:block" />
            suits you
          </h2>
          <Link
            href="/all-cars"
            className="flex items-center gap-2 font-black text-base"
          >
            View All <IconContainer name="chevronRight" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((car) => (
            <FunctionCard
              key={car.id}
              image={
                (car.gallaryArray && car.gallaryArray[0]) ||
                "/static/img/Img.png"
              }
              title={car.carName || "Car"}
              price={Number(car.hourlyPrice) || 0}
              type={car.segament || "Sedan"}
              duration={"per hour"}
              id={car.id}
              features={[
                { name: "gearType", label: car.transmission || "-" },
                { name: "fuel", label: car.fuelType || "-" },
              ]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

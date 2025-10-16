"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { get, ref } from "firebase/database";
import { useParams } from "next/navigation";
import Image from "next/image";

type Car = {
  userId: string;
  id: string;
  carName: string;
  brand: string;
  manufacturingYear: string;
  kmDriven: string;
  fuelType: string;
  transmission: string;
  numberOfGear: string;
  segament: string;
  hourlyPrice: string;
  description: string;
  gallaryArray: string[];
};

function Page() {
  const [data, setData] = useState<Car[]>([]);
  const [detailofCar, setDetailofCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const dbRef = ref(db, "carDetails");
  const pathId = useParams();

  useEffect(() => {
    (async () => {
      try {
        const snapShot = await get(dbRef);
        const retriveData = snapShot.val();
        // Firebase RTDB may return an object keyed by IDs; normalize to array
        const carsArray: Car[] = Array.isArray(retriveData)
          ? (retriveData as Car[])
          : retriveData
          ? Object.values(retriveData as Car[])
          : [];
        setData(carsArray);

        // Extract route id
        const routeId = (pathId as any)?.id;

        // find the matching car
        const foundCar =
          carsArray.find((car: Car) => car.id === routeId) ?? null;
        setDetailofCar(foundCar);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dbRef]);

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-(--gray) rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Car not found</h2>
          <p className="text-gray-600">
            Please go back and choose another car.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div
          className="p-6 sm:p-8 bg-(--primary) rounded-2xl flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between"
          style={{ backgroundImage: "url('/static/img/cartyrepattern.svg')" }}
        >
          <div className="text-white max-w-2xl">
            <h1 className="font-bold leading-[1] text-4xl sm:text-5xl lg:text-[56px] mb-4">
              {detailofCar?.carName}
            </h1>
            <p className="opacity-90 text-base sm:text-lg lg:text-xl mb-6">{detailofCar?.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">{detailofCar?.brand}</span>
              <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">{detailofCar?.transmission}</span>
              <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">{detailofCar?.fuelType}</span>
            </div>
          </div>
          <div className="w-full max-w-[420px] mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-center">
              {/* <Image
                src={detailofCar.image}
                alt={`${detailofCar.name}-img`}
                width={420}
                height={240}
                className="w-full h-auto object-contain"
                priority
              /> */}
            </div>
          </div>
        </div>

        

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
          {/* Left: specs and features */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {detailofCar?.carName}
                  </h2>
                  <p className="text-gray-600">{detailofCar?.brand}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Price per hour</span>
                  <div className="text-2xl font-extrabold">
                    ${detailofCar?.hourlyPrice}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Spec
                  label="Transmission"
                  value={
                    detailofCar
                      ? `${detailofCar.transmission}${
                          detailofCar.numberOfGear
                            ? ` ${detailofCar.numberOfGear} Gears`
                            : ""
                        }` || "-"
                      : "-"
                  }
                />
                <Spec label="Fuel" value={detailofCar?.fuelType || "-"} />
                <Spec label="Type" value={detailofCar?.segament || "-"} />
                <Spec label="ID" value={`#${detailofCar?.id || "-"} `} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Air Conditioning",
                  "GPS Navigation",
                  "Bluetooth",
                  "ABS",
                  "Airbags",
                  "USB Charger",
                  "Parking Sensors",
                ].map((f, idx) => (
                  <span
                    key={`${f}-${idx}`}
                    className="bg-(--gray) text-black px-4 py-2 rounded-xl text-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
            <h2 className="font-semibold text-black text-2xl mb-4">
              Book this car
            </h2>
            <div className="flex flex-col gap-3">
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
              <button className="bg-(--secondary) text-white font-semibold text-base rounded-xl py-3 mt-2">
                Book Now
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Total is calculated at checkout. Price from $
                {detailofCar?.hourlyPrice}
                /hr.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-(--darkGray) bg-(--gray) px-4 py-3">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export default Page;

'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import carsData from "../../../components/lib/cars.json";

type Car = {
    name: string;
    type: string;
    price: number;
    transmission: string;
    fuel: string;
    features: string[];
    image: string;
    id: number;

};

const car: Car[] = carsData

function Page() {
  const params = useParams() as { id?: string | string[] };
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const selected = car.find((c) => c.id === Number(idParam));

  if (!selected) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-(--gray) rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Car not found</h2>
          <p className="text-gray-600">Please go back and choose another car.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 lg:py-12">
      {/* Header / Hero-like card */}
      <div
        className="p-6 lg:p-8 bg-(--primary) rounded-2xl flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between"
        style={{ backgroundImage: "url('/static/img/cartyrepattern.svg')" }}
      >
        <div className="text-white max-w-2xl">
          <h1 className="font-bold leading-[1] text-[40px] lg:text-[56px] mb-4">
            {selected.name}
          </h1>
          <p className="opacity-90 mb-6">
            Premium comfort and performance. Select your dates and enjoy a smooth ride.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">
              {selected.type}
            </span>
            <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">
              {selected.transmission}
            </span>
            <span className="bg-white/15 px-4 py-2 rounded-xl text-sm">
              {selected.fuel}
            </span>
          </div>
        </div>

        <div className="w-full max-w-[420px] mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-center">
            <Image
              src={selected.image}
              alt={`${selected.name} image`}
              width={420}
              height={240}
              className="w-full h-auto object-contain"
              priority
            />
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
                <h2 className="text-2xl font-bold mb-1">{selected.name}</h2>
                <p className="text-gray-600">{selected.type}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">Price per hour</span>
                <div className="text-2xl font-extrabold">${selected.price}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Spec label="Transmission" value={selected.transmission} />
              <Spec label="Fuel" value={selected.fuel} />
              <Spec label="Type" value={selected.type} />
              <Spec label="ID" value={`#${selected.id}`} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="flex flex-wrap gap-3">
              {selected.features?.length ? (
                selected.features.map((f, idx) => (
                  <span
                    key={`${f}-${idx}`}
                    className="bg-(--gray) text-black px-4 py-2 rounded-xl text-sm"
                  >
                    {f}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No features listed.</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: booking card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
          <h2 className="font-semibold text-black text-2xl mb-4">Book this car</h2>
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
              Total is calculated at checkout. Price from ${selected.price}/hr.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-(--darkGray) bg-(--gray) px-4 py-3">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export default Page
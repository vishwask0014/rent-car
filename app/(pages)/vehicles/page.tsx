"use client";
import FunctionCard from "@/app/components/Common/FunctionCard";
import { useAuthContext } from "@/app/Context/AuthContext";
import Link from "next/link";
import React from "react";

export default function page() {
  const { data, loading } = useAuthContext() as any;
  const total = Array.isArray(data) ? data.length : 0;
  const brands = Array.isArray(data)
    ? Array.from(new Set(data.map((c: any) => c?.brand).filter(Boolean)))
    : [];

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6">
        <div  className="p-6 mt-8 sm:p-8 lg:p-12 rounded-2xl mb-8 text-white bg-(--primary)"
          style={{ backgroundImage: "url('/static/img/cartyrepattern.svg')" }}
        
        >
          <h1 className="text-3xl sm:text-4xl font-bold">Our Vehicles</h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Explore our curated fleet across brands and segments. Book the right car for your next journey.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 rounded-full bg-white/15 text-sm">Total: {total}</span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-sm">Sedan</span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-sm">SUV</span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-sm">Sports</span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-sm">Van</span>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="container mx-auto px-4 sm:px-6 pb-10 lg:pb-16">
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-[200px] bg-(--gray)" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-2/3 bg-(--gray) rounded" />
                  <div className="h-4 w-1/3 bg-(--gray) rounded" />
                  <div className="h-4 w-1/2 bg-(--gray) rounded" />
                  <div className="h-10 w-full bg-(--gray) rounded-lg mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (!data || data.length === 0) && (
          <div className="bg-white rounded-2xl border border-(--darkGray) p-8 sm:p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-(--gray) flex items-center justify-center text-(--primary) text-xl">
              🚗
            </div>
            <h2 className="text-xl font-semibold mb-2">No vehicles available</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any cars at the moment. Please check back later or go to
              the homepage to explore more.
            </p>
            <Link href="/" className="btnPrimary inline-block">Go to Home</Link>
          </div>
        )}

        {!loading && data && data.length > 0 && (
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
        )}
      </section>
    </>
  );
}

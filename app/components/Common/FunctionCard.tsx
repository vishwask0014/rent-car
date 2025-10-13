"use client";
import React from "react";
import IconContainer from "../IconContainer";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

type FunctionCardProps = {
  data: {
    id: string;
    carName: string;
    brand: string;
    manufacturingYear: string;
    kmDriven: string;
    fuelType: string;
    transmission: string;
    segament: string;
    hourlyPrice: string;
    description?: string;
    numberOfGear?: string;
    gallaryArray: string[];
  };
};

function FunctionCard({ data }: FunctionCardProps) {
 
  return (
    <article className="relative bg-(--gray) rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="w-fit h-fit text-sm font-semibold text-(--primary) bg-(--primary)/10 px-2 py-1 rounded-full absolute top-2 right-2">
        New
      </div>
      {/* Car Image */}
      <div className="max-w-[500px] w-full">
        <Swiper
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          spaceBetween={10}
          slidesPerView={1}
          loop={(data?.gallaryArray?.length ?? 0) > 1}
          observer
          observeParents
          modules={[Autoplay]}
          className="w-full"
        >
          {data?.gallaryArray?.map((src, index) => {
            return (
              <SwiperSlide key={`${index}-${src}`}>
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px]">
                  <Image
                    fill
                    src={src}
                    alt={`img-${index}`}
                    unoptimized
                    className="w-full object-cover bg-white"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 capitalize">
            {data.carName}
          </h3>
          <span className="text-xl font-bold text-(--primary)">
            ₹{data.hourlyPrice}
          </span>
        </div>

        {/* Type + Duration */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="capitalize">{data.brand}</span>
          <span className="text-gray-400">Hourly</span>
        </div>

        {/* {data.manufacturingYear} */}

        {/* Features */}
        <div className="flex flex-wrap gap-4 justify-between mb-6 mt-3">
          <div className="flex items-center gap-1.5 text-gray-700">
            <IconContainer name={"gearType"} />
            <span className="text-sm text-slate-600">
              {data.numberOfGear}, {data.transmission}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-700">
            <IconContainer name={"fuel"} />
            <span className="text-sm text-slate-600">{data.fuelType}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-700">
            <IconContainer name={"snowflake"} />
            <span className="text-sm text-slate-600">AC</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-700">
            <IconContainer name={"calendar"} />
            <span className="text-sm text-slate-600">
              {data.manufacturingYear}
            </span>
          </div>
        </div>

        <div className="mt-1 mb-6">
          <p className="text-sm text-slate-600 line-clamp-3">
            {data.description}
          </p>
        </div>

        {/* Button */}
        <Link
          href={`/${data.id}`}
          className="btnPrimary w-full text-center block mt-auto"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default FunctionCard;

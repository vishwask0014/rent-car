"use client";

import { db } from "@/app/firebase";
import { ref, set } from "firebase/database";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type CarDetailsProps= {
    arryName:string,
    carName:string,
    manufacuringYear:string,
    KMdriven:string,
    FuelType:string,
    transmission:string,
    segament:string,
    uploadImage:string,
    gallaryArray:string[]

}

export default function page({ path }: { path: string }) {
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [manufactuingYear, setmanufactuingYear] = useState("");
  const [KMdriven, setKMdriven] = useState("");
  const [FuelType, setFuelType] = useState("");
  const [Segament, setSegament] = useState("");
  const [uploadImage, setuploadImage] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [gallaryArray, setGallaryArray] = useState<string[]>([]);

  // array to collect images upload by user
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setuploadImage(URL.createObjectURL(file));
      setGallaryArray((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="container mx-auto px-4 bg-white">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 py-12">
          <div className="form-contianer">
            <label>Car Name</label>
            <input
              type="text"
              placeholder=""
              onChange={(e: any) => setCarName(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Brand Name</label>
            <input
              type="text"
              className="border-slate-300"
              onChange={(e: any) => setBrand(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Manufactuing Year</label>
            <input
              type="text"
              placeholder=""
              onChange={(e: any) => setmanufactuingYear(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <input
              type="text"
              placeholder=""
              onChange={(e: any) => setKMdriven(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Fuel Type</label>
            <input
              type="text"
              placeholder=""
              onChange={(e: any) => setFuelType(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Transmission</label>
            <select onChange={(e: any) => setTransmission(e.target.value)}>
              <option disabled>Select transmission type</option>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>

          <div className="form-contianer">
            <label>Segament</label>
            <select onChange={(e: any) => setSegament(e.target.value)}>
              <option>SUV</option>
              <option>Micro SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Micro Hatchback</option>
              <option>Sports</option>
              <option>Limosuine</option>
              <option>Not Aware</option>
            </select>
          </div>

          <div className="w-full  form-contianer col-span-3">
            <label>Upload Images</label>
            <input type="file" placeholder="" onChange={handleFileChange} />
            {gallaryArray.length >= 1 && (
              <div className="col-span-3 border border-slate-300 w-full px-6 py-4 rounded-2xl ">
                <div className="grid grid-cols-4">
                  {gallaryArray.map((i: string, index: React.Key) => (
                    <Image
                      key={index}
                      alt="img"
                      height={190}
                      width={190}
                      className="object-cover rounded-md border-2 border-slate-300"
                      src={i}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btnPrimary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { db } from "@/app/firebase";
import { ref, set } from "firebase/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ path }: { path: string }) {
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturingYear, setmanufacturingYear] = useState("");
  const [kmDriven, setKMdriven] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [segament, setSegament] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [uploadImage, setuploadImage] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [gallaryArray, setGallaryArray] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const router = useRouter();

  // array to collect images upload by user
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setuploadImage(URL.createObjectURL(file));
      setGallaryArray((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  const handleSubmit = (
    userId: string,
    carName: string,
    brand: string,
    manufacturingYear: string,
    kmDriven: string,
    fuelType: string,
    transmission: string,
    segament: string,
    hourlyPrice: string,
    description: string,
    gallaryArray: string[]
  ) => {
    const refrence = ref(db, "carDetails/" + userId);

    set(refrence, {
      carName: carName,
      brand: brand,
      manufacturingYear: manufacturingYear,
      kmDriven: kmDriven,
      fuelType: fuelType,
      transmission: transmission,
      segament: segament,
      hourlyPrice: hourlyPrice,
      description: description,
      gallaryArray: gallaryArray,
    });

    console.log("data added");
    alert("data added");
    // clear value int he input states
    // setCarName("");
    setBrand("");
    setmanufacturingYear("");
    setKMdriven("");
    setFuelType("");
    setTransmission("");
    setSegament("");
    setHourlyPrice("");
    setuploadImage("");
    setGallaryArray([]);
    setDescription("");
    router.refresh();
  };

  return (
    <>
      <div className="container mx-auto px-4 bg-white">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 py-12">
          <div className="form-contianer">
            <label>Car Name</label>
            <input
              type="text"
              placeholder="e.g., Swift Dzire"
              onChange={(e: any) => setCarName(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Brand Name</label>
            <input
              type="text"
              className="border-slate-300"
              placeholder="e.g., Maruti Suzuki"
              onChange={(e: any) => setBrand(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Manufacturing Year</label>
            <input
              type="text"
              placeholder="e.g., 2021"
              onChange={(e: any) => setmanufacturingYear(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>KM Driven</label>
            <input
              type="text"
              placeholder="e.g., 25000"
              onChange={(e: any) => setKMdriven(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Fuel Type</label>
            <input
              type="text"
              placeholder="e.g., Petrol, Diesel, CNG, EV"
              onChange={(e: any) => setFuelType(e.target.value)}
            />
          </div>

          <div className="form-contianer">
            <label>Transmission</label>
            <select
              value={transmission}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTransmission(e.target.value)
              }
            >
              <option value={""} disabled>
                Select transmission type
              </option>
              <option value={"Manual"}>Manual</option>
              <option value={"Automatic"}>Automatic</option>
            </select>
          </div>

          <div className="form-contianer">
            <label>Segament</label>
            <select
              value={segament}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSegament(e.target.value)
              }
            >
              <option value="" disabled>
                Select segment
              </option>
              <option value="SUV">SUV</option>
              <option value="Micro SUV">Micro SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Micro Hatchback">Micro Hatchback</option>
              <option value="Sports">Sports</option>
              <option value="Limosuine">Limosuine</option>
              <option value="Not Aware">Not Aware</option>
            </select>
          </div>

          <div className="form-contianer">
            <label>Hourly Price</label>
            <input
              type="text"
              placeholder="₹ 0.00"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHourlyPrice(e.target.value)
              }
            />
          </div>

          <div className="form-contianer col-span-3">
            <label>Description</label>
            <textarea
              placeholder="Describe the car, features, condition, pickup details, etc."
              className="w-full border rounded-md p-3 !min-h-[120px]"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="w-full  form-contianer col-span-3">
            <div className="flex gap-4">
              <div>
                {/* <label className="mb-2">Upload Images</label> */}
                <div className="border flex justify-center items-center border-(--primary)/80 bg-(--primary)/10 px-6 py-4 rounded-2xl w-[220px] h-[220px] relative overflow-hidden">
                  
                  <div className="text-xl text-center font-medium text-(--primary)"><i className="fa-solid fa-upload"></i> <br />Upload Images</div>
                  <input
                    type="file"
                    multiple
                    className="absolute z-10 top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                {gallaryArray.length >= 1 && (
                  <div className="col-span-3 ">
                    <div className="flex flex-wrap gap-4">
                      {gallaryArray.map((i: string, index: React.Key) => (
                        <div className="relative w-[220px] h-[220px]">
                          <Image
                            key={index}
                            alt="img"
                            fill
                            className="object-cover rounded-md border-2 border-slate-300"
                            src={i}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() =>
              handleSubmit(
                `rent-${carName}`,
                carName,
                brand,
                manufacturingYear,
                kmDriven,
                fuelType,
                transmission,
                segament,
                hourlyPrice,
                description,
                gallaryArray
              )
            }
            className="btnPrimary w-1/2 text-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

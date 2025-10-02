'use client'

import React, { useState } from "react";
import FunctionCard from "@/app/components/Common/FunctionCard";
import carsData from "../../components/lib/cars.json";
import cardType from "../../components/lib/carType.json";

type Car = {
    id: string | number;
    name: string;
    type: string;
    price: number;
    transmission: string;
    fuel: string;
    features: string[];
    image: string;
};

const cars: Car[] = carsData;

export default function AllCarsPage() {
    const [activeType, setActiveType] = useState('all')

    const handleType = (value: string) => {
        setActiveType(value)
    }

    const filterCars = activeType === 'all' ? cars : cars.filter((car) => car.type.toLowerCase() === activeType.toLowerCase())


    return (
        <div className="container mx-auto py-10 lg:py-20">
            <TabBtn activeType={activeType} fxn={handleType} />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filterCars.map((car: Car) => (
                    <FunctionCard
                      key={`${car.id}-${car.name}`}
                      data={{
                        carName: car.name,
                        brand: car.type,
                        manufacturingYear: '-',
                        kmDriven: '-',
                        fuelType: car.fuel,
                        transmission: car.transmission,
                        segament: '-',
                        hourlyPrice: String(car.price),
                        numberOfGear: '-',
                        gallaryArray: [car.image],
                        description: '-',
                      }}
                    />
                ))}
            </div>
        </div>
    );
}



interface TabBtnProps {
    activeType: string;
    fxn: (value: string) => void;
}

const TabBtn = ({ activeType, fxn }: TabBtnProps) => {
    return (
        <>
            <div>
                <ul className="mb-6 lg:mb-12 flex gap-4 flex-row justify-center items-center overflow-auto w-full">
                    <li onClick={() => fxn('all')} className={`px-6 py-2 font-semibold text-lg rounded-full ${activeType === 'all' ? 'bg-(--primary) text-white' : 'bg-(--gray)'}`}>All</li>
                    {
                        cardType.map((i) => (
                            <li
                              key={i}
                              onClick={() => fxn(i)}
                              className={`px-6 py-2 font-semibold text-lg rounded-full ${activeType === i ? 'bg-(--primary) text-white' : 'bg-(--gray)'}`}
                            >
                              {i}
                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    )
}


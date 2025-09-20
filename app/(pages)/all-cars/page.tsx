'use client'

import React, { act, useState } from "react";
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
                {filterCars.map((car: Car, idx: number) => (
                    <FunctionCard
                        key={idx}
                        image={car.image}
                        title={car.name}
                        price={car.price}
                        type={car.type}
                        duration="per day"
                        id={car.id}
                        features={[
                            { name: car.transmission === "Automat" ? "gearType" : "manual", label: car.transmission },
                            { name: "fuel", label: car.fuel },
                            ...car.features.map((f: string) => ({ name: f === "Air Conditioner" ? "snowflake" : f.toLowerCase(), label: f }))
                        ]}
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
                        cardType.map((i, index) => (
                            <>
                                <li onClick={() => fxn(i)} className={`px-6 py-2 font-semibold text-lg rounded-full ${activeType === i ? 'bg-(--primary) text-white' : 'bg-(--gray)'}`}>{i}</li>

                            </>
                        ))
                    }
                </ul>
            </div>

        </>
    )
}


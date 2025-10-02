'use client'

import { useParams } from 'next/navigation'
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
    const pathName = useParams()
    const carDetail = car.filter((car) => car.id === Number(pathName.id))
    return (
        <div>
            test detail page
            {
                carDetail[0]?.name
            }
        </div>
    )
}

export default Page
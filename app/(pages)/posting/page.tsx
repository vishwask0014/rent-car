'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [name, setName] = useState('')
    const [brandName, setbrandName] = useState('')
    const [manufactuingYear, setmanufactuingYear] = useState('')
    const [KMdriven, setKMdriven] = useState('')
    const [FuelType, setFuelType] = useState('')
    const [Segament, setSegament] = useState('')
    const [uploadImage, setuploadImage] = useState()


useEffect(() => {
    const r = ref(realtimeDB,path);
    const unS
})

    const submitHandle = () => {
        alert('')
    }

    return (
        <>
            <div className='container mx-auto px-4 bg-white'>
                <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 py-12'>

                    <div className='form-contianer'>
                        <label>Name</label>
                        <input type='text' placeholder='' onChange={(e: any) => setName(e.target.value)} />
                    </div>


                    <div className='form-contianer'>
                        <label>Brand Name</label>
                        <input type='text' className='border-slate-300' onChange={(e: any) => setbrandName(e.target.value)} />
                    </div>


                    <div className='form-contianer'>
                        <label>Manufactuing Year</label>
                        <input type='text' placeholder='' onChange={(e: any) => setmanufactuingYear(e.target.value)} />
                    </div>

                    <div className='form-contianer'>
                        <label>KM driven</label>
                        <input type='text' placeholder='' onChange={(e: any) => setKMdriven(e.target.value)} />
                    </div>

                    <div className='form-contianer'>
                        <label>Fuel Type</label>
                        <input type='text' placeholder='' onChange={(e: any) => setFuelType(e.target.value)} />
                    </div>

                    <div className='form-contianer'>
                        <label >Segament</label>
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

                    <div className='w-full  form-contianer col-span-3'>
                        <label>Upload Images</label>
                        <input type='file' placeholder='' onChange={(e: any) => setuploadImage(e.target.value)} />
                    </div>

                    <div className='col-span-3 border border-slate-300 w-full px-6 py-4 rounded-2xl '>

                        <div className='grid grid-cols-4'>
                            <Image alt='img' height={190} width={190} className='object-cover rounded-md border-2 border-slate-300' src={uploadImage || ''} />
                        </div>
                    </div>

                </div>
                <div className='flex justify-end'>
                    <button className='btnPrimary' onClick={() => submitHandle()} type='submit'>Submit</button>
                </div>
            </div>
        </>
    )
}

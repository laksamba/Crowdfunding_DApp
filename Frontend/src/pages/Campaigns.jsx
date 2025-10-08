import React from 'react'
import Donationcard from "../components/Donationcard"
import { FaHandsHelping } from "react-icons/fa";
const Campaigns = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center pt-18'>
      <div className='flex gap-4'>
        <div>
          <FaHandsHelping className="text-emerald-500 md:w-24 md:h-24 w-18 h-18"/>
        </div>
       <div className='text-center'>
         <h1 className='md:text-6xl text-4xl font-bold pb-2 block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600'>Campaigns</h1>
        <p className='text-xl md:text-2xl text-gray-700 tracking-wider'>Your kindness creates change.</p>
       </div>
      </div>
        <Donationcard/>
        <Donationcard/>
    </div>
  )
}

export default Campaigns
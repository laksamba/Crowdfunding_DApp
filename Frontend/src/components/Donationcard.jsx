import React, { useState } from "react";
import image from './../assets/help.png';
import MetricBar from "./MetricBar";

const Donationcard = () => {
  const [goal, setGoal] = useState('');

  return (
    <div className="p-4 shadow-lg m-4 md:m-6 lg:m-8 max-w-sm md:max-w-lg lg:max-w-2xl mx-auto bg-gray-200 ">
      <div>
        <img src={image} alt="Sara's Surgery Fund" className="h-48 w-full md:h-64 lg:h-80 object-cover rounded-lg" />
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold mt-3 md:mt-4 pb-5">Medical Help for Sara's Surgery</div>
      <MetricBar goal={10000} raised={4500} />
      <div className="flex items-center justify-between mt-3 md:mt-4">
        <h1 className="text-lg md:text-xl lg:text-2xl">Total Donors: 400</h1>
        <button className="bg-green-600 p-2 md:p-3 rounded-2xl text-white text-sm md:text-base hover:bg-green-700 transition">
          Donate Now
        </button>
      </div>
      <div className="text-gray-700 mt-3 md:mt-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Details</h1>
        <p className="text-sm md:text-base lg:text-lg">
          Sara has been diagnosed with a condition that requires immediate surgery.
          The costs are more than expected, so we need your help to cover the
          medical expenses.
        </p>
        <button className="text-black text-sm md:text-base mt-2 hover:underline">
          More Info
        </button>
      </div>
      <div className="font-bold mt-3 md:mt-4 text-sm md:text-base lg:text-lg">
        Ends in 3 Days
      </div>
    </div>
  );
};

export default Donationcard;
import React from "react";
import { FaGlobe, FaLock, FaEye, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-emerald-500 text-4xl" />,
    title: "Decentralized",
    desc: "No central authority. Smart contracts handle everything automatically.",
  },
  {
    icon: <FaEye className="text-emerald-500 text-4xl" />,
    title: "Transparent",
    desc: "All transactions and campaign data are publicly visible on the blockchain.",
  },
  {
    icon: <FaLock className="text-emerald-500 text-4xl" />,
    title: "Secure",
    desc: "Blockchain technology ensures funds are secure and cannot be tampered with.",
  },
  {
    icon: <FaGlobe className="text-emerald-500 text-4xl" />,
    title: "Global",
    desc: "Accessible to anyone with an internet connection and a Web3 wallet.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center py-16 mt-8 bg-gray-50 min-h-[50vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Why Create Campaigns With Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16 max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

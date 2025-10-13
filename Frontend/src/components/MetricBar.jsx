import React from "react";

const MetricBar = ({ goal, raised }) => {
  const percentage = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Progress
        </h2>
        <span className="text-xs text-gray-500">
          {percentage.toFixed(1)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-600 font-medium">
        <p>
          Raised:{" "}
          <span className="text-green-700 font-semibold">
            {raised} ETH
          </span>
        </p>
        <p>
          Goal:{" "}
          <span className="text-gray-800 font-semibold">
            {goal} ETH
          </span>
        </p>
      </div>
    </div>
  );
};

export default MetricBar;

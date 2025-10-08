import React from "react";

const MetricBar = ({goal, raised}) => {
    const percentage = Math.min((raised/goal)*100, 100);
  return (
    <div className="w-full max-w-md mx-auto py-4 bg-white px-2 ">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Fundraising Progress</h2>
        <p className="text-sm text-gray-600">
          Raised:${raised.toString()}of ${goal.toString()} goal
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-600 h-full rounded-b-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {percentage.toFixed(1)}% of goal reached
      </div>
    </div>
  );
};

export default MetricBar;

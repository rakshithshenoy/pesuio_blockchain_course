import React from "react";

const BasicCardInput = ({ heading, body }) => {
  return (
    <div>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {heading}
        </h5>
        <input type="number" className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden">
          {body}
        </input>
      </div>
    </div>
  );
};

export default BasicCardInput;

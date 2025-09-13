import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex flex-col items-center">
     
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      
        <p className="mt-3 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;

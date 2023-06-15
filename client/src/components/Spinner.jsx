import React from "react";

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-50 bg-[rgba(0,0,0,0.02)] flex items-center justify-center">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;

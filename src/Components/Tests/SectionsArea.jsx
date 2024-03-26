import React from "react";
import Logo_Temp from "../../assets/Logo-Temp.png";

export const SectionsArea = ({ noOfSections, heading }) => {
  const range = Array.from({ length: noOfSections });
  return (
    <div className="flex flex-col  items-center h-full justify-between">
      <div className="flex flex-col justify-center items-center bg-white-700 w-[100%] py-[0.5em]">
        <img
          src={Logo_Temp}
          alt="loading"
          className="size-24 object-contain"
        ></img>
        <h1 className="font-normal text-3xl w-full flex justify-center">
          Branch Selector
        </h1>
        <h1 className="font-semibold text-3xl w-[100%] flex justify-center mt-[0.3em] mb-[0.4em]">
          {heading}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-[100%]  max-h-[15em] overflow-y-auto rounded-xl mt-[-4em] pt-[1em] pb-[2em]">
        {range.map((_, index) => (
          <div
            key={index}
            className="bg-[#ffffff] mt-[1em] text-black w-[75%] h-[3em] flex justify-center items-center rounded-md text-xl  border-solid border-2 border-[#85aad7]"
          >
            Section {index + 1}
          </div>
        ))}
      </div>

      <div className="text-xl font-semibold text-[#ffffff]  bg-[#2d6ddc] w-28 h-10 flex justify-center items-center mb-[2em] rounded-md">
        Exit
      </div>
    </div>
  );
};

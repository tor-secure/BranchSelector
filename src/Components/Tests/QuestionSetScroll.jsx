import React, { useEffect, useState } from "react";

export const QuestionSetScroll = ({
  qNo,
  questionsData,
  result,
  setResult,
}) => {
  // useEffect(() => {
  //   const tempResult = { ...result };
  //   tempResult[questionsData.id] = 3;
  //   setResult(tempResult);
  //   console.log(result);
  // }, [result]);

  const [sliderValue, setSliderValue] = useState(3);
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="w-[90%] my-[2.1em]">
      <h2 className="text-[1.4em] font-normal">
        {qNo + "." + " " + questionsData.question}
      </h2>

      <div className="relative my-6 mt-8 md:ml-7">
        <input
          id="labels-range-input"
          type="range"
          value={sliderValue}
          min="1"
          max="5"
          onChange={handleSliderChange}
          className="w-[100%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 md:w-[50%]"
        />
        <div className="w-[100%] h-6 relative mt-7 md:w-[50%]">
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-0 transform -translate-x-1/2 bottom-6">
            1
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-1/4 transform -translate-x-1/2 bottom-6">
            2
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-1/2 transform -translate-x-1/2 bottom-6">
            3
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-3/4 transform -translate-x-1/2 bottom-6">
            4
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute left-full transform translate-x-1/2 bottom-6">
            5
          </span>
        </div>
      </div>
    </div>
  );
};

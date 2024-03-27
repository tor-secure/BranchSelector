import React, { useState } from "react";

export const QuestionSet = ({ qNo, questionsData, result, setResult }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  //   console.log(qNo, questionsData);

  const handleOptionClick = (index, option) => {
    console.log("Yooooooooooo", questionsData.id, option.id);
    const tempResult = { ...result }; // Create a copy of result to avoid mutating state directly
    tempResult[questionsData.id] = option.id;
    setResult(tempResult);
    setSelectedOptionIndex(index);
  };

  return (
    <div className="w-[90%]  my-[3em] ">
      <h2 className="text-2xl font-semibold">
        {qNo + "." + " " + questionsData.question}
      </h2>
      <ul className="list-disc list-inside">
        {questionsData.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(index, option)}
            className={`hover:bg-[#e9e9e9] rounded-[7px] pl-3 indent-4 mt-6 h-10 text-[1.12em]  ${
              questionsData.id in result &&
              option.id == result[questionsData.id]
                ? "bg-[#367AF3] text-[#FFFFFF] "
                : "bg-[#ffffff]"
            } flex flex-row items-center`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

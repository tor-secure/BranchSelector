import React, { useState } from "react";

//The questions section along with the options. Used for regular MCQ kind questions.
export const QuestionSet = ({ qNo, questionsData, result, setResult }) => {
  
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleOptionClick = (index, option) => {
    const tempResult = { ...result };
    tempResult[questionsData.id] = option.id;
    setResult(tempResult);
    setSelectedOptionIndex(index);
  };

  return (
    <div className="w-[90%]  my-[2.1em]">
      <h2 className="text-[1.4em] font-normal">
        {qNo + "." + " " + questionsData.question}
      </h2>
      <ul className="list-disc list-inside md:ml-6">
        {questionsData.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(index, option)}
            className={` rounded-[7px] cursor-pointer  mt-6 min-h-10 text-[1.12em] text-start px-5 py-1  ${
              questionsData.id in result &&
              option.id == result[questionsData.id]
                ? "bg-[#367AF3] text-[#FFFFFF] hover:bg-[#6393e6]"
                : "bg-[#CBE1F6] hover:bg-[#e2eef9]"
            } flex flex-row items-center`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

import React, { useState } from "react";

//The questions section along with the options. Used for Image MCQ kind questions.
export const QuestionSetImgMcq = ({
  qNo,
  questionsData,
  result,
  setResult,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleOptionClick = (index, option) => {
    const tempResult = { ...result };
    tempResult[questionsData.id] = option.id;
    setResult(tempResult);
    setSelectedOptionIndex(index);
  };

  const sortedOptions = [...questionsData.options].sort((a, b) => {
    // Replace 'text' with the property you want to sort by
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });

  return (
    <div className="w-[90%] my-[2.1em] ">
      <div className="flex text-2xl">
        {qNo + "."}
        <h2 className="text-[1.4em] font-normal flex justify-center w-full">
          <img
            src={questionsData.question}
            alt="loading"
            className="size-52 md:size-80"
          />
        </h2>
      </div>
      <ul className="flex flex-wrap justify-center mt-9">
        {sortedOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(index, option)}
            className={`rounded-[7px] mx-3 mt-6 min-h-10 text-[1.12em] text-start p-3 relative transition-all ${
              questionsData.id in result &&
              option.id == result[questionsData.id]
                ? "bg-[#367AF3] text-[#FFFFFF] hover:bg-[#6393e6]"
                : "bg-[#CBE1F6] hover:bg-[#e2eef9]"
            } ${window.innerWidth < 768 ? "mb-3" : ""}`}
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderWidth = "2px";
              e.currentTarget.style.borderColor = "#367AF3";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderWidth = "1px";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={option.text}
              alt="loading"
              className="size-20 md:size-28"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

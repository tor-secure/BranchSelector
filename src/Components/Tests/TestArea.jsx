import React, { useEffect, useState } from "react";
import { QuestionSet } from "./QuestionSet";
import { SectionsArea } from "./SectionsArea";

export const TestArea = () => {
  const heading = "Vark Test";
  const [result, setResult] = useState({});
  const questionsPerPage = 3;
  const [questionsRange, setQuestionsRange] = useState([0, questionsPerPage]);
  const [isLastPage, setIsLastPage] = useState(false);

  const goToPrev = () => {
    if (questionsRange[0] >= questionsPerPage) {
      setQuestionsRange([
        questionsRange[0] - questionsPerPage,
        questionsRange[0],
      ]);
      setIsLastPage(false);
    }
  };

  const goToNext = () => {
    if (questionsRange[1] + questionsPerPage <= questionsData.length) {
      setQuestionsRange([
        questionsRange[0] + questionsPerPage,
        questionsRange[1] + questionsPerPage,
      ]);
    } else if (questionsRange[0] + questionsPerPage < questionsData.length) {
      setQuestionsRange([
        questionsRange[0] + questionsPerPage,
        questionsData.length,
      ]);

      setIsLastPage(true);
    }
  };

  const hadleSubmit = () => {
    console.log("Submitted");
  };

  // var result = {}
  const questionsData = [
    {
      id: "1",
      question: "How do you prefer to learn new concepts?1",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "2",
      question: "How do you prefer to learn new concepts?2",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "3",
      question: "How do you prefer to learn new concepts?3",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "4",
      question: "How do you prefer to learn new concepts?4",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "5",
      question: "How do you prefer to learn new concepts?5",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "6",
      question: "How do you prefer to learn new concepts?6",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
    {
      id: "7",
      question: "How do you prefer to learn new concepts?7",
      options: [
        { VARO1: "Through diagrams and charts" },
        { VARO2: "By listening to explanations" },
        { VARO3: "By hands-on activities" },
        { VARO4: "By reading textbooks" },
      ],
    },
  ];

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className=" bg-[#CBE1F6] h-screen">
      <div className="flex overflow-hidden mb-2 ">
        <div className="lg:block hidden w-[20em] h-screen fixed bg-[#ffffff]">
          <SectionsArea
            noOfSections={Math.ceil(questionsData.length / questionsPerPage)}
            heading={heading}
          />
        </div>
        <div className="lg:ml-[20em]  flex-grow  bg-white-500 flex flex-col items-center bg-[#CBE1F6]">
          {questionsData
            .slice(questionsRange[0], questionsRange[1])
            .map((questionData, index) => (
              <QuestionSet
                qNo={index + questionsRange[0] + 1}
                questionsData={questionData}
                result={result}
                setResult={setResult}
              />
            ))}

          {/* <QuestionSet /> */}

          <div className="flex w-[90%] flex-row justify-between">
            <button
              className="text-base font-semibold text-[#ffffff]  bg-[#2d6ddc] w-24 h-8 flex justify-center items-center mb-[2em] rounded-md"
              onClick={() => goToPrev()}
            >
              Previous
            </button>

            {questionsRange[1] == questionsData.length ? (
              <button
                className="text-base font-semibold text-[#ffffff]  bg-[#2d6ddc] w-24 h-8 flex justify-center items-center mb-[2em] rounded-md"
                onClick={() => hadleSubmit()}
              >
                Submit
              </button>
            ) : (
              <button
                className="text-base font-semibold text-[#ffffff]  bg-[#2d6ddc] w-24 h-8 flex justify-center items-center mb-[2em] rounded-md"
                onClick={() => goToNext()}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

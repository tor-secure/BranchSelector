import React, { useEffect, useRef, useState } from "react";
import Logo_Temp from "../../assets/Logo-Temp.png";
import { evaluteTest } from "../../services/testService";
import { MdExitToApp } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { newTestTaken } from "../../services/userService";

export const NextPrevSec = ({
  heading,
  questionsRange,
  setQuestionsRange,
  questionsData,
  result,
  questionsPerPage,
  noOfSections,
  testQueryName,
  isInstruction,
  secData,
  setSecData,
  range1,
}) => {
  const navigate = useNavigate();
  const [currSec, setCurrSec] = useState(0);

  useEffect(() => {
    setSecData(range1);
  }, [noOfSections]);

  useEffect(() => {
    setCurrSec(Math.ceil(questionsRange[0] / questionsPerPage));
  }, [questionsRange]);

  let itemRefs = useRef([]);

  const goToSec = (sec) => {
    if (secData[sec] == true) {
      setQuestionsRange([
        questionsPerPage * sec,
        questionsPerPage * sec + questionsPerPage,
      ]);
    } else {
      alert("Answer all the previous sections");
    }
    // console.log(questionsRange);

    // itemRefs.current[sec]?.scrollIntoView({
    //   behavior: "smooth", // Optional: defines the transition animation
    //   block: "nearest", // Optional: defines vertical alignment
    //   inline: "start", // Optional: defines horizontal alignment
    // });
  };

  const goToPrev = () => {
    if (questionsRange[0] >= questionsPerPage) {
      setQuestionsRange([
        questionsRange[0] - questionsPerPage,
        questionsRange[0],
      ]);

      window.scrollTo(0, 0);
    }
  };

  const goToNext = () => {
    const tempSecData = secData;
    tempSecData[Math.ceil(questionsRange[1] / questionsPerPage)] = true;
    setSecData(tempSecData);

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
    }

    window.scrollTo(0, 0);
  };

  const checkIfAllAnswered = () => {
    const answeredAllQuestions = questionsData
      .slice(questionsRange[0], questionsRange[1])
      .every((questionData) => questionData.id in result);

    if (!answeredAllQuestions)
      alert("Answer all the questions in this section.");

    return answeredAllQuestions;
  };

  const hadleSubmit = async () => {
    console.log("Submitted", result);
    const finRes = await evaluteTest(testQueryName, result);
    console.log(finRes);
    await newTestTaken(testQueryName, result);
    navigate("/result", {
      state: { result: finRes, testName: testQueryName },
    });
  };

  const goToTestList = () => {
    const confirmNavigation = window.confirm(
      "Are you sure? Your progress will be lost!"
    );
    if (confirmNavigation) {
      navigate("/testList");
    }
  };

  return (
    <>
      {secData && (
        <div className="h-[7em]  z-20 w-full">
          <div className="h-[50%]  flex items-center justify-center">
            {/* <h3 className="font-semibold cursor-pointer hover:text-[#686868]">
            Prev
          </h3>
          <h3 className="font-semibold cursor-pointer hover:text-[#686868]">
            Next
          </h3> */}

            {!isInstruction && (
              <div className="flex items-center justify-between w-full text-xl mt-8 mx-5">
                {questionsRange[0] == 0 ? (
                  <button
                    className="font-bold cursor-pointer text-[#727272] ml-5"
                    onClick={() => goToPrev()}
                  >
                    {/* <IoIosArrowBack size={22} /> */}
                    Prev
                  </button>
                ) : (
                  <button
                    className="font-bold cursor-pointer  hover:text-[#686868] ml-5"
                    onClick={() => goToPrev()}
                  >
                    {/* <IoIosArrowBack size={22} /> */}
                    Prev
                  </button>
                )}

                {questionsRange[1] >= questionsData.length ? (
                  <button
                    className="font-bold cursor-pointer text-[#367AF3] hover:text-[#7aa7f4] mr-5 text-"
                    onClick={() => hadleSubmit()}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="font-bold cursor-pointer hover:text-[#686868] mr-5"
                    onClick={() => {
                      checkIfAllAnswered() ? goToNext() : console.log();
                    }}
                  >
                    {/* <IoIosArrowForward size={22} /> */}
                    Next
                  </button>
                )}
              </div>
            )}

            {isInstruction && (
              <h1 className="font-bold text-xl flex justify-center items-center h-full w-full md:text-2xl">
                Instructions
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

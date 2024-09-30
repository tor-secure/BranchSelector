import React, { useEffect, useRef, useState } from "react";
import Logo_Temp from "../../assets/Logo-Temp.png";
import { evaluteTest } from "../../services/testService";
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { newTestTaken } from "../../services/userService";
import { toast } from "react-toastify";
import OverlayLoader from "../OverlayLoader";


/*

This is the component that appears at the top of the screen when taking a test.

REMEMBER: If any changes are made to the functionality of next/previous/submit handlers, make sure to make the
          same changes in the NextPrevSec.jsx component. 

          Else the next and previous buttons on the top and bottom will have different behaviours resulting 
          in unexpected errors.
          
          
*/

export const TestNavbar = ({
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSecData(range1);
  }, [noOfSections]);

  useEffect(() => {
    setCurrSec(Math.ceil(questionsRange[0] / questionsPerPage));
  }, [questionsRange]);

  let itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current[currSec]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [currSec]);

  const goToSec = (sec) => {
    if (secData[sec] == true) {
      setQuestionsRange([
        questionsPerPage * sec,
        questionsPerPage * sec + questionsPerPage,
      ]);
    } else {
      alert("Answer all the previous sections");
    }
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
    setLoading(true)
    const toastId = toast.loading("Evaluating Test....", { autoClose: false, draggable: true });
    const finRes = await evaluteTest(testQueryName, result);
    await newTestTaken(testQueryName, finRes, result);
    toast.update(toastId, {
        render: "Test evaluation complete!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    navigate("/result", {
      state: { result: finRes, testName: testQueryName },
    });
  };

  const goToTestList = () => {
    const confirmNavigation = window.confirm(
      "Are you sure? Your progress will be lost!"
    );
    if (confirmNavigation) {
      navigate("/tests");
    }
  };

  return (
    <>
      {secData && (
        <header className="h-[7em]  fixed top-0 z-20 w-screen ">
          <OverlayLoader isLoading={isLoading} loadingText={'Evaluating Test....'}/>
          <nav className="h-[50%] bg-white flex justify-between items-center mx-2 sm:mx-8">
            <div className="h-full flex items-center ml-1 w-[12em]">
              <img
                src={Logo_Temp}
                alt="Loading"
                className="object-contain h-[90%]"
              ></img>
              <p className="md:block hidden font-medium text-lg  ">
                BranchSelector
              </p>
            </div>
            <h1 className="font-bold text-lg flex justify-center items-center h-full w-full text-center md:text-2xl lg:text-3xl">
              {heading}
            </h1>
            <div className="h-full flex items-center justify-end w-[12em]">
              <button
                onClick={() => goToTestList()}
                className="bg-[#E43131] rounded-md h-[55%]  font-semibold text-white mr-1 flex justify-evenly items-center p-2 text-md hover:bg-[#eb6565] "
              >
                <MdExitToApp /> <p className="hidden md:block">Exit</p>
              </button>
            </div>
          </nav>

          <div className="h-[50%] bg-[#F3F3F3] border-y border-y-[#D6D6D6] border-y-solid flex items-center justify-center">
            {!isInstruction && (
              <div className="flex items-center justify-center w-full">
                {questionsRange[0] == 0 ? (
                  <button
                    className="font-bold cursor-pointer text-[#727272] ml-5"
                    onClick={() => goToPrev()}
                  >
                    Prev
                  </button>
                ) : (
                  <button
                    className="font-bold cursor-pointer  hover:text-[#686868] ml-5"
                    onClick={() => goToPrev()}
                  >
                    Prev
                  </button>
                )}

                <ul className=" flex justify-between mx-0 max-w-max overflow-x-auto md:mx-5 md:max-w-[40%] md:overflow-hidden">
                  {secData.map((val, index) => (
                    <li
                      onClick={() => {
                        goToSec(index);
                      }}
                      key={index}
                      ref={(el) => (itemRefs.current[index] = el)}
                      className={`mx-2 ${
                        val
                          ? "bg-[#367AF3] text-white"
                          : "bg-[#CBE1F6] text-black"
                      } 
                    ${
                      currSec == index &&
                      "border-2 border-[#191919] border-solid"
                    }
                    rounded-full  h-[2em] cursor-pointer font-bold text-sm flex justify-center items-center px-3`}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>

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
                    Next
                  </button>
                )}
              </div>
            )}

            {isInstruction && (
              <h2 className="font-bold text-xl flex justify-center items-center h-full w-full md:text-2xl">
                Instructions
              </h2>
            )}
          </div>
        </header>
      )}
    </>
  );
};

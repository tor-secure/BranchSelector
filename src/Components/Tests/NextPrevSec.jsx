import React, { useEffect, useRef, useState } from "react";
import { evaluteTest } from "../../services/testService";
import { useNavigate } from "react-router-dom";
import { newTestTaken } from "../../services/userService";
import { toast } from "react-toastify";
import OverlayLoader from "../OverlayLoader";

/*

This is the component that appears at the bottom of the screen when taking a test.

REMEMBER: If any changes are made to the functionality of next/previous/submit handlers, make sure to make the
          same changes in the TestNavbar.jsx component. 

          Else the next and previous buttons on the top and bottom will have different behaviours resulting 
          in unexpected errors.

*/

export const NextPrevSec = ({
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
  const [isLoading,setLoading] = useState(false);

  useEffect(() => {
    setSecData(range1);
  }, [noOfSections]);


  const goToPrev = () => {
    if (questionsRange[0] >= questionsPerPage) {
      setQuestionsRange([
        questionsRange[0] - questionsPerPage,
        questionsRange[0],
      ]);

      window.scrollTo(0, 0); 
      //Scroll back upto the top of the page when going to next section
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
    //Checking if the all the question ids in the question data are present in the result dict.
    const answeredAllQuestions = questionsData
      .slice(questionsRange[0], questionsRange[1])
      .every((questionData) => questionData.id in result);

    if (!answeredAllQuestions)
      alert("Answer all the questions in this section.");

    return answeredAllQuestions;
  };

  const handleSubmit = async () => {
    setLoading(true)
    const toastId = toast.loading("Evaluating Test....", { autoClose: false, draggable: true });
    // Call fuction to evaluate the test. When completed, update the results in firebase.
    const finRes = await evaluteTest(testQueryName, result);
    await newTestTaken(testQueryName, finRes);
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


  return (
    <>
      {secData && (  
        <div className="h-[7em]  z-20 w-full">
          <OverlayLoader isLoading={isLoading} loadingText={'Evaluating Test....'}/>
          <div className="h-[50%]  flex items-center justify-center">

            {!isInstruction && (
              <div className="flex items-center justify-between w-full text-xl mt-8 mx-5">
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

                {questionsRange[1] >= questionsData.length ? (
                  <button
                    className="font-bold cursor-pointer text-[#367AF3] hover:text-[#7aa7f4] mr-5 text-"
                    onClick={() => handleSubmit()}
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

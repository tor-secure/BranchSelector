import React, { useEffect, useState } from "react";
import { QuestionSet } from "./QuestionSet";
import { SectionsArea } from "./SectionsArea";
import { evaluteTest, getTestQuestions } from "../../services/testService";
import { TestNavbar } from "./TestNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionSetScroll } from "./QuestionSetScroll";
import { QuestionSetImgMcq } from "./QuestionSetImgMcq";
import { NextPrevSec } from "./NextPrevSec";

export const TestArea = () => {
  const location = useLocation();
  const { testMetaData } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    //If users land on this page without selecting any test on the previous page, go back to home
    if (Object.keys(testMetaData).length === 0) {
      navigate("/");
    }
  }, [navigate, testMetaData]);

  const heading = testMetaData.name;
  const [result, setResult] = useState({});
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
  const [questionsRange, setQuestionsRange] = useState([0, questionsPerPage]);

  //Set initial question range
  useEffect(() => {
    setQuestionsRange([0, questionsPerPage]);
  }, [questionsPerPage]);

  //Fetch the questions for the test
  useEffect(() => {
    const fetchData = async () => {
      setQuestionsData(await getTestQuestions(testMetaData.queryCode));
    };

    fetchData();

  }, []);

  
  const [questionsData, setQuestionsData] = useState([]);


  useEffect(() => {
    if (testMetaData.displayType === "slider") {
      const tempResult = { ...result };
      questionsData.map((data) => {
        tempResult[data.id] = 3;
      });
      setResult(tempResult);
    }
    if (testMetaData.displayType === "img-mcq") setQuestionsPerPage(1);
  }, [testMetaData.displayType, questionsData]);

  //To keep track of which section the user is currently in
  const range1 = Array.from({
    length: Math.ceil(questionsData.length / questionsPerPage),
  }).fill(false);
  
  range1[0] = true;

  const [secData, setSecData] = useState(range1);

  const renderQuestions = () => {
    // Slice the questions data based on the provided range
    const slicedQuestions = questionsData.slice(
      questionsRange[0],
      questionsRange[1]
    );

    // Determine the component to render based on the displayType
    if (testMetaData.displayType === "mcq") {
      return slicedQuestions.map((questionData, index) => (
        <QuestionSet
          key={index} // Using the question ID if available would be preferable
          qNo={index + questionsRange[0] + 1}
          questionsData={questionData}
          result={result}
          setResult={setResult}
        />
      ));
    } else if (testMetaData.displayType === "slider") {
      return slicedQuestions.map((questionData, index) => (
        <QuestionSetScroll
          key={index} // Using the question ID if available would be preferable
          qNo={index + questionsRange[0] + 1}
          questionsData={questionData}
          result={result}
          setResult={setResult}
        />
      ));
    } else if (testMetaData.displayType === "img-mcq") {
      return slicedQuestions.map((questionData, index) => (
        <QuestionSetImgMcq
          key={index} // Using the question ID if available would be preferable
          qNo={index + questionsRange[0] + 1}
          questionsData={questionData}
          result={result}
          setResult={setResult}
        />
      ));
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Message shown in the dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {
        <TestNavbar
          heading={heading}
          questionsRange={questionsRange}
          setQuestionsRange={setQuestionsRange}
          questionsData={questionsData}
          result={result}
          questionsPerPage={questionsPerPage}
          noOfSections={Math.ceil(questionsData.length / questionsPerPage)}
          testQueryName={testMetaData.queryCode}
          isInstruction={false}
          secData={secData}
          setSecData={setSecData}
          range1={range1}
        />
      }
      <div className=" bg-[#ffffff] h-screen mt-[4em]">
        <div className="flex overflow-hidden mb-2 ">
          <div className="lg:block hidden w-[24em] h-screen fixed bg-[#ffffff] border-r border-r-[#D6D6D6] border-r-solid">
            <SectionsArea
              noOfSections={Math.ceil(questionsData.length / questionsPerPage)}
              heading={heading}
              testCode={testMetaData.queryCode}
            />
          </div>
          <div className="lg:ml-[25em] flex-grow  bg-white-500 flex flex-col items-center bg-[#ffffff] pt-10 mt-5">
            {renderQuestions()}
            <NextPrevSec
              heading={heading}
              questionsRange={questionsRange}
              setQuestionsRange={setQuestionsRange}
              questionsData={questionsData}
              result={result}
              questionsPerPage={questionsPerPage}
              noOfSections={Math.ceil(questionsData.length / questionsPerPage)}
              testQueryName={testMetaData.queryCode}
              isInstruction={false}
              secData={secData}
              setSecData={setSecData}
              range1={range1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

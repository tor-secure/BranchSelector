import React, { useEffect, useState } from "react";
import { QuestionSet } from "./QuestionSet";
import { SectionsArea } from "./SectionsArea";
import { evaluteTest, getTestQuestions } from "../../services/testService";
import { TestNavbar } from "./TestNavbar";
import { useLocation } from "react-router-dom";
import { QuestionSetScroll } from "./QuestionSetScroll";
import { QuestionSetImgMcq } from "./QuestionSetImgMcq";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const TestArea = () => {
  const location = useLocation();
  const { testMetaData } = location.state || {};
  const heading = testMetaData.name;
  const [result, setResult] = useState({});
  // const questionsPerPage = 5;
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
  const [questionsRange, setQuestionsRange] = useState([0, questionsPerPage]);

  useEffect(() => {
    setQuestionsRange([0, questionsPerPage]);
  }, [questionsPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      //console.log(await getTestQuestions("brain"));
      setQuestionsData(await getTestQuestions(testMetaData.queryCode));
    };

    fetchData();

    // Empty dependency array ensures this effect runs only once after the initial render
  }, []);

  // var result = {}
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    console.log("testMetaData.displayType:", testMetaData.displayType);
    if (testMetaData.displayType === "slider") {
      const tempResult = { ...result };
      questionsData.map((data) => {
        tempResult[data.id] = 3;
        console.log("tempResult:", tempResult);
      });
      setResult(tempResult);
    }
    if (testMetaData.displayType === "img-mcq") setQuestionsPerPage(1);
  }, [testMetaData.displayType, questionsData]);

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
        />
      }
      {/* <Navbar /> */}

      <div className=" bg-[#ffffff] h-screen mt-[4em]">
        <div className="flex overflow-hidden mb-2 ">
          <div className="lg:block hidden w-[24em] h-screen fixed bg-[#ffffff] border-r border-r-[#D6D6D6] border-r-solid">
            <SectionsArea
              noOfSections={Math.ceil(questionsData.length / questionsPerPage)}
              heading={heading}
            />
          </div>
          <div className="lg:ml-[25em] flex-grow  bg-white-500 flex flex-col items-center bg-[#ffffff] pt-10">
            {renderQuestions()}
          </div>
        </div>
      </div>
    </div>
  );
};

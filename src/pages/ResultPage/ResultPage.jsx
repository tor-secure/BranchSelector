import React, { useEffect, useState } from "react";

import { Chart as ChartJS } from "chart.js/auto"; //Do not remove this import.

import { useLocation, useNavigate } from "react-router-dom";
import { getTestMetaData } from "../../services/testService";
import { resultcontentdata } from "../../services/ResultContent";
import ResultGraphComponent from "./ResultGraphComponent";
import ResultTextComponent from "./ResultTextComponent";
import ResultSidebar from "./ResultSidebar";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, testName, dateTaken } = location.state || {};
  const testmeta = getTestMetaData(testName);


  const [isScreenLarge, setScreenLarge] = useState(window.innerWidth > 768);



  useEffect(() => {
    const handleResize = () => {
      setScreenLarge(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
  }, []);


  return (
    <>
    <section
      className="bg-[#fffefe] "
      style={{
        background:
          "linear-gradient(143.6deg, rgba(28, 124, 252, 0) 20.79%, rgba(28, 124, 252, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
    >
      

      <div className="lg:flex font-poppins   relative ">
        <ResultSidebar/>

        <div className="relative z-2  w-[100]  py-12  lg:px-16 px-5 overflow-y-hidden border-t-2 ">
          <div>
            <h2 className=" text-3xl md:text-3xl pb-4 md:pb-7 font-semibold  ">
              {testmeta.name} Result
            </h2>
           <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-5">

<ResultTextComponent testName = {testName} result={result} dateTaken={dateTaken}/>
              <ResultGraphComponent
                testname={testName}
                result={
                  testName === 'english' || testName === 'iq'
                    ? (({ 'Correct Answers': correctAnswers, 'Wrong Answers': wrongAnswers }) => ({ 'Correct Answers': correctAnswers, 'Wrong Answers': wrongAnswers }))(result)
                    : result
                }
              />
            </div>
          </div>

          <div className="pt-12">
            <h2 className="text-3xl font-semibold pb-7">Insights</h2>
            <div className="bg-white shadow-xl  shadow-[#dce7ff] py-12 px-5 md:px-12 rounded-[15px] ">
              <h2 className="font-semibold text-2xl">What does this mean?</h2>
              <div className="flex flex-col space-y-8 pt-10 md:px-5">
                <div>
                  {Object.keys(resultcontentdata[testName]).map((key) => (
                    <div key={key} className="mb-8">
                      <h2 className="pb-2 font-semibold text-[17px]">
                        {key + ":"}
                      </h2>

                      <p> {resultcontentdata[testName][key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

                    
        </div>
      </div>
    </section>
    </>
  );
};

export default ResultsPage;

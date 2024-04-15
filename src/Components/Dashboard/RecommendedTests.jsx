import { useEffect, useState, useRef } from "react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import "./BreathingAnimation.css";
import { useNavigate } from "react-router-dom";
import { getTestLogo, testMetaData } from "../../services/testService";

export const RecommendedTests = ({ recommendedTests }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 600, // Adjust the value as per your requirement
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 600, // Adjust the value as per your requirement
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {recommendedTests && (
        <div className="flex items-center justify-between mt-3">
          <div>
            <RiArrowLeftSLine
              size={50}
              className="text-[#707070] ml-8 hover:scale-150"
              onClick={scrollLeft}
            />
          </div>
          <div className="flex-col w-[80%]">
            <div className="">
              <div className="w-full flex justify-between">
                <h3 className="text-2xl font-semibold">Recommended Tests</h3>
                <h3 className="text-lg font-bold text-primary">View all</h3>
              </div>
              <div
                ref={scrollContainerRef}
                className="grid grid-flow-col overflow-x-auto py-5 -ml-7 myScrollbar"
              >
                {recommendedTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center bg-white shadow-blue-200 p-1 shadow-lg w-52 h-44 mx-7 rounded-lg"
                  >
                    <h4 className="mt-2 font-bold text-primary text-lg">
                      {test.name.split(" ")[0]}
                    </h4>
                    <div>{getTestLogo(test.queryCode, 40)}</div>
                    <button
                      onClick={() => {
                        // console.log(testMetaData[test.queryCode]);
                        navigate("/testInstruction", {
                          state: { testMetaData: test },
                        });
                      }}
                      className="mb-2 bg-primary text-white font-semibold p-1 px-5 rounded text-sm"
                    >
                      Take test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <RiArrowRightSLine
              size={50}
              className="text-[#707070] mr-8 hover:scale-150"
              onClick={scrollRight}
            />
          </div>
        </div>
      )}
    </>
  );
};

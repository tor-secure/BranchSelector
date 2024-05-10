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
        left: scrollContainerRef.current.scrollLeft - 600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 600,
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
              className="text-[#707070] ml-0 lg:ml-4 z-10 text-3xl sm:text-5xl"
              onClick={scrollLeft}
            />
          </div>
          <div className="flex-col w-[75%] md:w-[80%] ml-6">
            <div className="">
              <div className="w-full flex justify-between">
                <h3 className="text-lg sm:text-2xl font-semibold -ml-10 sm:ml-0">
                  Recommended Tests
                </h3>
                <h3 className="text-sm font-bold text-primary -mr-8 mt-1 sm:mr-0 sm:mt-0">
                  View all
                </h3>
              </div>
              <div
                ref={scrollContainerRef}
                className="grid grid-flow-col overflow-x-scroll  py-5 -ml-7 myScrollbar w-full"
              >
                {recommendedTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center bg-white shadow-blue-200 p-1 shadow-lg w-32 h-32  sm:w-52 sm:h-44 mx-7 rounded-lg"
                  >
                    <h4 className="mt-2 font-bold text-primary text-sm sm:text-lg">
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
                      className="mb-2 bg-primary text-white font-semibold p-1 px-5 rounded text-[9px] sm:text-sm"
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
              className="text-[#707070] mr-0 lg:mr-4  text-3xl sm:text-5xl"
              onClick={scrollRight}
            />
          </div>
        </div>
      )}
    </>
  );
};

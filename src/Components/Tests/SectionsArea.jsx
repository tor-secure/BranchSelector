import React from "react";
import Lottie from "lottie-react";
import Blob from "../../assets/animation/Blob.json";
import BoyStudyLotte from "../../assets/animation/BoyStudyingLotte.json";
import testContent from "../../Constants/TestPageConstVals";

//The left side fact section of the test taking page.
export const SectionsArea = ({ noOfSections, heading, testCode }) => {
  return (
    <div className="flex flex-col  items-center h-full justify-between bg-white">
      <div className="h-full mt-[7em]">
        <div className="h-[35rem] w-[35em] absolute top-[-1em] ml-[-5em]">
          <Lottie
            animationData={Blob}
            loop={true}
            className="h-full w-full object-contain"
          />
          <div className="absolute top-[12em] left-0 flex flex-col items-center justify-center w-[50%] ml-[9em] text-white">
            <h3 className="text-3xl font-bold">Did you know?</h3>
            <p className="text-center mt-3 font-thin text-base">
              {testContent[testCode]}
            </p>
          </div>
        </div>

        <Lottie
          animationData={BoyStudyLotte}
          loop={true}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

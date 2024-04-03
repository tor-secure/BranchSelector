import React from "react";
import Logo_Temp from "../../assets/Logo-Temp.png";
import Lottie from "lottie-react";
import Blob from "../../assets/animation/Blob.json";
import BoyStudyLotte from "../../assets/animation/BoyStudyingLotte.json";
import BoyStudy from "../../assets/BoyStudy.png";

export const SectionsArea = ({ noOfSections, heading }) => {
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
              The VARK model was developed by Neil Fleming in 1987 and stands
              for Visual, Aural/Auditory, Read/Write, and Kinesthetic learning
              styles.
            </p>
          </div>
        </div>

        {/* <img src={BoyStudy} alt="loading" className="absolute bottom-0  "></img> */}
        <Lottie
          animationData={BoyStudyLotte}
          loop={true}
          className="h-full w-full object-contain"
        />
      </div>
      {/* <div className="flex flex-col justify-center items-center bg-white-700 w-[100%] py-[0.5em]">
        <img
          src={Logo_Temp}
          alt="loading"
          className="size-24 object-contain"
        ></img>
        <h1 className="font-normal text-3xl w-full flex justify-center">
          Branch Selector
        </h1>
        <h1 className="font-semibold text-3xl w-[100%] flex justify-center mt-[0.3em] mb-[0.4em]">
          {heading}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-[100%]  max-h-[15em] overflow-y-auto rounded-xl mt-[-4em] pt-[1em] pb-[2em]">
        {range.map((_, index) => (
          <div
            key={index}
            className="bg-[#ffffff] mt-[1em] text-black w-[75%] h-[3em] flex justify-center items-center rounded-md text-xl  border-solid border-2 border-[#85aad7]"
          >
            Section {index + 1}
          </div>
        ))}
      </div>

      <div className="text-xl font-semibold text-[#ffffff]  bg-[#2d6ddc] w-28 h-10 flex justify-center items-center mb-[2em] rounded-md">
        Exit
      </div> */}
    </div>
  );
};

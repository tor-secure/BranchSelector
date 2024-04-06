import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import About from "../../assets/animation/aboutLatest.json";
import BoyThinking from "../../assets/animation/boyThinking.json";

const Message = () => {
  return (
    <section className=" py-4 md:py-10  ">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block relative md:-top-20 object-contain ">
            <Lottie animationData={BoyThinking} loop={true} className="" />
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-gray-800 text-3xl font-semibold md:text-5xl">
              Crafting Futures: Your Path Starts Here
            </h3>
            <p className="mt-3 text-gray-600 md:text-lg text-ellipsis">
              At Branch Selector, we're passionate about guiding you toward your
              dream career. Our personalized tests help you explore your
              interests and discover your strengths, providing tailored
              recommendations to shape your academic journey. Join us as we
              embark on this journey of self-discovery, together creating a
              future filled with purpose and passion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;

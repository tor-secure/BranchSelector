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
              With personalized
              recommendations, we'll guide you towards academic paths that align
              with your goals and aspirations. Explore, learn, and embark on a
              transformative educational experience. Your future starts here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;

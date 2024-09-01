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
              <br/>
                BranchSelector.com, a pioneering website launched in 2012, initially focused on guiding students to choose the most suitable branch from over 60 options in engineering. Over the years, it has evolved into a comprehensive platform designed to help students understand their strengths, weaknesses, and aptitudes. Now in 2024, the site offers a wide array of tests, from the Engineering Branch Selector and IQ Test to more specialized assessments like the Medical Aptitude Test and VARK Test, catering to a diverse set of needs. This holistic approach ensures that students can make well-informed decisions about their academic and career paths, rather than relying solely on traditional advice or external pressures.
                <br/> <br/>
                The importance of this platform lies in its ability to address the common mistakes made by students and parents when selecting academic or career paths. Often, choices are made based on societal trends, parental expectations, or superficial interests, without a deep understanding of the student’s inherent abilities or passions. This can lead to dissatisfaction, underperformance, and even a complete change of direction later in life. BranchSelector.com helps mitigate these risks by providing a scientific basis for decision-making, encouraging students to explore their true potential, and ultimately guiding them toward a fulfilling career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;

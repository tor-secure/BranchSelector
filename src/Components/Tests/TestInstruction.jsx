import { Disclaimer } from "./Disclaimer";
import React, { useEffect, useState } from "react";
import { TestNavbar } from "./TestNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { TestInstructionSection } from "./TestInstructionSection";
import { TestInstructionSectionMCQImg } from "./TestInstructionSectionMCQImg";
import { TestInstructionSectionSlider } from "./TestInstructionSectionSlider";
import { canTakeTest } from "../../services/userService";
import { toast } from "react-toastify";

export const TestInstruction = () => {
  const location = useLocation();
  const { testMetaData } = location.state ?? {};

  const [isChecked, setIsChecked] = useState(false);

  //If user has exhausted credits, code was showing error toast twice. Using this fixes it.
  const [hasShownToast, setHasShownToast] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const navigate = useNavigate();

  if (!testMetaData) {
    setTimeout(() => {
      navigate("/testlist");
    }, 10);
    /* IDK why, but delay is required other wise it just loads a blank page. 
       Probably has something to do with the Protected route stuff */
    return null;
  }

  const heading = testMetaData.name;

  useEffect(() => {
      let isMounted = true;

      const canTakeTestCheck = async () => {
        try {
          const result = await canTakeTest();
          if (isMounted && !result && !hasShownToast) {
            toast.error("You cannot take anymore tests! Buy more credits!");
            setHasShownToast(true);
            navigate("/dashboard", { state: { selectedPage: 'Add Credits' } });
          }
        } catch (error) {
          console.error("Error checking if user can take test:", error);
        }
      };

      canTakeTestCheck();

      return () => {
        isMounted = false;
      };
    }, [navigate, hasShownToast]);

  const checkTest = (testType) => {
    // Early return pattern - if the condition is met, the component renders early.
    if (testType == "mcq") {
      return (
        <TestInstructionSection evaluationType={testMetaData.evaluationType} />
      );
    } else if (testType == "slider") {
      return (
        <TestInstructionSectionSlider
          evaluationType={testMetaData.evaluationType}
        />
      );
    } else if (testType == "img-mcq") {
      return (
        <TestInstructionSectionMCQImg
          evaluationType={testMetaData.evaluationType}
        />
      );
    }
  };

  const setQuestionsRange = () => {};
  return (
    <div>
      <TestNavbar
        heading={heading}
        questionsRange={[]}
        setQuestionsRange={setQuestionsRange}
        questionsData={{}}
        result={{}}
        questionsPerPage={0}
        noOfSections={0}
        testQueryName={""}
        isInstruction={true}
        secData={[]}
        setSecData={() => {}}
        range1={[]}
      />

      <div className="mt-[8.3em] h-[62em] md:h-[30em]">
        <div className="w-full h-[25em] md:flex">
          <div className="w-full md:w-[50%] ">
            <h3 className="text-center font-bold text-xl">Disclaimer</h3>
            <div className="p-7 ">
              <Disclaimer />
              <p className="mt-10 text-center text-lg font-semibold">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  value="value1"
                  className="mx-1 checkbox-large scale-[2] mr-3"
                  onChange={handleCheckboxChange}
                  checked={isChecked} // Controlled component: set the checked state
                />
                I have read the disclaimer
              </p>
            </div>
          </div>

          <div className="h-full bg-[#DBDBDB] w-[2.5px] hidden md:block"></div>

          {checkTest(testMetaData.displayType)}
        </div>
      </div>
      <div className="w-full flex justify-center mb-4">
        <button
          className=" bg-[#367AF3] text-white font-semibold w-28 h-10 rounded-md hover:bg-[#689af0]"
          onClick={() => {
            if (isChecked) {
              navigate("/testPage", {
                state: { testMetaData: testMetaData },
              });
            } else {
              alert("Please confirm that you have read the disclaimer.");
            }
          }}
        >
          Begin Test
        </button>
      </div>
    </div>
  );
};

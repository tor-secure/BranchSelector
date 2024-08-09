import DashboardBackground from "./../../assets/DashboardBackground.svg";
import { CreditsRemainingCard } from "./CreditsRemainingCard";
import { TestsTakenCard } from "./TestsTakenCard";
import "./BreathingAnimation.css";
import { RecommendedTests } from "./RecommendedTests";
import { useEffect, useState } from "react";
import {
  getRemainingTests,
  testMetaData,
} from "../../services/testService";
import {
  getRemainingCredits,
  getTestHistory,
} from "../../services/userService";
import { TestHistory } from "./TestHistory";


export const MainDashboardContent = () => {
  const [testHistory, setTestHistory] = useState(null);
  const [recommendedTests, setRecommendedTests] = useState(null);
  const [remainingCredits, setRemainingCredits] = useState(null);

  useEffect(() => {
    async function fetchTestHistory() {
      const testHistoryTemp = await getTestHistory();
      const userDataTemp = await getRemainingCredits();

      const remainigTemp = getRemainingTests(testHistoryTemp);

      setRemainingCredits(userDataTemp);
      setRecommendedTests(remainigTemp);

      setTestHistory(testHistoryTemp);
    }

    fetchTestHistory();
  }, []);

  return testHistory !== null &&
    recommendedTests !== null &&
    remainingCredits !== null ? (
    <div>
      <div className="w-[100vw] lg:w-[calc(100vw-18em)] flex flex-col">
        <div className="bg-gradient-to-b from-[#e9f3fc] to-white  lg:bg-gradient-to-b lg:from-[#CBE1F6] lg:to-white z-0 ">
          <div className="flex justify-between">
            <div className="hidden w-[20%] lg:flex text-xl sm:text-6xl items-center flex-row sm:flex-col justify-center mt-5 sm:mt-0">
              <h1 className="  font-extralight ml-0 md:ml-[-30px] ">Hello</h1>
              <h1 className=" font-semibold">There!</h1>
            </div>
            <img
              src={DashboardBackground}
              className="hidden lg:block md:h-[20em] animate-breathing mt-5 -ml-28"
              alt="Dashboard Background"
            />
            <div className="hidden  lg:flex items-end flex-col py-5 ">
              <CreditsRemainingCard remainingCredits={remainingCredits} />
              <TestsTakenCard
                testsTaken={
                  Object.keys(testMetaData).length - recommendedTests.length
                }
              />
            </div>
          </div>
          <div className="hidden lg:flex justify-between">
            <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
            <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
          </div>

          <div className="  lg:hidden  flex py-5 pt-0 justify-center">
            <CreditsRemainingCard remainingCredits={remainingCredits} />
            <TestsTakenCard
              testsTaken={
                Object.keys(testMetaData).length - recommendedTests.length
              }
            />
          </div>

          <RecommendedTests recommendedTests={recommendedTests} />
          {/* <TestHistory testHistory={testHistory} /> */}
        </div>
        <TestHistory testHistory={testHistory} />
      </div>
    </div>
  ) : (
    <div className="flex items-center text-blue-500 font-extrabold justify-center ml-[5%] mt[5%] pb-[10%] pt-[10%] text-[18px] lg:ml-[35%] lg:mt-[10%] lg:text-[32px]">
      Loading...
    </div>
  );
};

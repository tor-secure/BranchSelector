import DashboardBackground from "./../../assets/DashboardBackground.svg";
import { CreditsRemainingCard } from "./CreditsRemainingCard";
import { TestsTakenCard } from "./TestsTakenCard";
import "./BreathingAnimation.css";
import { RecommendedTests } from "./RecommendedTests";

export const RightSection = () => {
  return (
    <div className="ml-[18em]">
      <div className="flex justify-between">
        <div className="w-[20%] flex items-center flex-col justify-center">
          <h1 className="text-6xl font-extralight ml-[-30px]">Hello</h1>
          <h1 className="text-6xl font-semibold">There!</h1>
        </div>
        <img
          src={DashboardBackground}
          className="h-[20em] animate-breathing"
        ></img>
        <div className="w-[20%] flex items-end flex-col py-5 ">
          <CreditsRemainingCard />
          <TestsTakenCard />
        </div>
      </div>
      <div className="flex justify-between">
        <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
        <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
      </div>

      <RecommendedTests />
    </div>
  );
};

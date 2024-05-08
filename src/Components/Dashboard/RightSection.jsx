import DashboardBackground from "./../../assets/DashboardBackground.svg";
import { CreditsRemainingCard } from "./CreditsRemainingCard";
import { TestsTakenCard } from "./TestsTakenCard";
import "./BreathingAnimation.css";
import { RecommendedTests } from "./RecommendedTests";
import { useEffect, useState } from "react";
import { getRemainingTests, getTestLogo } from "../../services/testService";
import { getTestHistory } from "../../services/userService";
import { TestHistory } from "./TestHistory";

export const RightSection = ({
  setScrolledPastSection,
  setScrollGap,
  scrolledPastSection,
}) => {
  const [testHistory, setTestHistory] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);

  useEffect(() => {
    const sectionTemp = document.getElementById("sectionToCheck"); // Get the section element
    const scrollGap1 = sectionTemp.offsetHeight - 250;

    const handleScroll = () => {
      const section = document.getElementById("sectionToCheck"); // Get the section element
      const sectionTop = section.offsetHeight - 400; // Get the top position of the section

      //console.log(sectionTop, window.scrollY);
      const scrollPosition = window.scrollY;

      // console.log(
      //   400 + scrollPosition - section.offsetHeight,
      //   section.offsetHeight,
      //   "sectionTemp.offsetTop"
      // );
      setScrollGap(400 + scrollPosition - section.offsetHeight);

      // Update scrolledPastSection state based on scroll position
      if (scrollPosition > sectionTop) {
        setScrolledPastSection(true);
      } else {
        setScrolledPastSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    async function fetchTestHistory() {
      const testHistoryTemp = await getTestHistory();
      console.log("Fetched test history:", testHistoryTemp);
      //console.log("0", testHistoryTemp[0]["test-name"]);
      const remainigTemp = getRemainingTests(testHistoryTemp);
      setRecommendedTests(remainigTemp);
      console.log("Remaining test", remainigTemp);
      setTestHistory(testHistoryTemp);
    }

    fetchTestHistory();
  }, []);

  return (
    <div className={`ml-0 md:ml-[18em] ${scrolledPastSection ? "" : ``}`}>
      <div
        className="bg-gradient-to-b from-[#CBE1F6] to-white z-0 "
        id="sectionToCheck"
      >
        <div className="flex justify-between">
          <div className="hidden w-[20%] sm:flex items-center flex-col justify-center">
            <h1 className=" text-6xl font-extralight ml-[-30px]">Hello</h1>
            <h1 className="text-6xl font-semibold">There!</h1>
          </div>
          <img
            src={DashboardBackground}
            className="h-[20em] animate-breathing mt-5"
          ></img>
          <div className="hidden w-[20%] sm:flex items-end flex-col py-5 ">
            <CreditsRemainingCard />
            <TestsTakenCard />
          </div>
        </div>
        <div className="flex justify-between">
          <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
          <hr className="border border-[#c2d6fd] my-4 w-44"></hr>
        </div>
        <div className="w-full sm:hidden items-end flex py-5 ">
          <CreditsRemainingCard />
          <TestsTakenCard />
        </div>
        <RecommendedTests recommendedTests={recommendedTests} />
      </div>
      <TestHistory testHistory={testHistory} />
    </div>
  );
};

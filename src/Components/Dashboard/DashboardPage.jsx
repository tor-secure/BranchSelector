import { useState } from "react";
import { LeftSection } from "./LeftSection";
import { MainDashboardContent } from "./MainDashboardContent";
import AddCredits from "./AddCredits";
import { useLocation } from "react-router-dom";


export const DashboardPage = () => {
  const location = useLocation()
  const state = location.state
  const [selectedPage, setSelectedPage] = useState(state?state.selectedPage:"Your Data");
  return (
    <div class="bg-white block lg:flex items-start w-full">
      {/* Left section to select the required section */}
      <LeftSection setSelectedPage={setSelectedPage} />

      {/* Render right side content based selection on left side */}
      {selectedPage == "Your Data" && <MainDashboardContent />}
      {selectedPage === "Add Credits" && <AddCredits/> }
    </div>
  );
};

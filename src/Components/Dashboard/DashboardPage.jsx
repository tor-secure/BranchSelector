import { useState } from "react";
import { LeftSection } from "./LeftSection";
import { MainDashboardContent } from "./MainDashboardContent";
import AddCredits from "./AddCredits";


export const DashboardPage = () => {
  const [selectedPage, setSelectedPage] = useState("Your Data");
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

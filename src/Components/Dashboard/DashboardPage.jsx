import { useState } from "react";
import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";

export const DashboardPage = () => {
  return (
    <div class="bg-white flex items-start w-full">
      <LeftSection />
      <RightSection />
    </div>
  );
};

import { useState } from "react";
import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";

export const DashboardPage = () => {
  const [scrolledPastSection, setScrolledPastSection] = useState(false);
  const [scrollGap, setScrollGap] = useState(100);

  return (
    <div class="bg-white">
      <LeftSection
        scrolledPastSection={scrolledPastSection}
        scrollGap={scrollGap}
      />
      <RightSection
        setScrolledPastSection={setScrolledPastSection}
        scrolledPastSection={scrolledPastSection}
        setScrollGap={setScrollGap}
      />
    </div>
  );
};

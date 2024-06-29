import { useState } from "react";
import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";
import { Settings } from "./Settings";
import { BuyCredits } from "./BuyCredits";
import { RedeemCoupon } from "./RedeemCoupon";

export const DashboardPage = () => {
  const [selectedPage, setSelectedPage] = useState("Your Data");
  return (
    <div class="bg-white block lg:flex items-start w-full">
      <LeftSection setSelectedPage={setSelectedPage} />
      {selectedPage == "Your Data" && <RightSection />}
      {selectedPage == "Buy Credits" && <BuyCredits />}
      {selectedPage == "Settings" && <Settings />}
      {selectedPage == "Redeem Coupon" && <RedeemCoupon />}
    </div>
  );
};

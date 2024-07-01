import React, { useState } from "react";
import { BuyCreditsSection } from "./BuyCreditsSection";
import { VoucherSection } from "./VoucherSection";

const AddCreditSliderTabs = () => {
  const [activeTab, setActiveTab] = useState("buyCredits");

  return (
    <div className="font-poppins  mt-16 items-center mx-5 lg:mr-24 justify-center flex flex-col">
      <div className="flex relative px-1 border rounded-md w-full max-w-md mx-auto">
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-[#367AF3] rounded-md transition-transform duration-300 ease-in-out ${
            activeTab === "useVoucher" ? "translate-x-full ml-[-7px] " : ""
          }`}
        />
        <button
          className={`flex-1 py-4 px-2 text-center relative z-10 transition-colors duration-300 text-sm ${
            activeTab === "buyCredits"
              ? "text-white font-bold"
              : "text-black font-bold"
          }`}
          onClick={() => setActiveTab("buyCredits")}
        >
          Buy Credits
        </button>
        <button
          className={` flex-1 py-4 px-2 text-center relative z-10 transition-colors duration-300 text-sm ${
            activeTab === "useVoucher"
              ? "text-white font-bold"
              : "text-black font-bold"
          }`}
          onClick={() => setActiveTab("useVoucher")}
        >
          Use Voucher
        </button>
      </div>
      <div className=" bg-white w-full max-w-md mx-auto mt-4">
        <div
          className={`transition-transform duration-300 ease-in-out ${
            activeTab === "buyCredits" ? "block" : "hidden"
          }`}
        >
          <BuyCreditsSection />
        </div>
        <div
          className={`transition-transform duration-300 ease-in-out ${
            activeTab === "useVoucher" ? "block" : "hidden"
          }`}
        >
          <VoucherSection />
        </div>
      </div>
    </div>
  );
};

export default AddCreditSliderTabs;

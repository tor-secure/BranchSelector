import { VoucherSection } from "../../Components/Dashboard/VoucherSection";
import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import creditImg from "../../assets/CreditsRemainingIcon.svg";
import {
  getCurrentUserInfo,
  validateDiscountVoucher,
} from "../../services/userService";
import { toast } from "react-toastify";
import CreditsRemainingIcon from "./../../assets/CreditsRemainingIcon.svg";
import { useLocation } from "react-router-dom";
import { getPricingPlans } from "../PricingPage/PricingPlans";

const CheckoutPage = () => {
  const location = useLocation();
  const { plan, currencyCode } = location.state || {};

  const [totalAmountToPay, setTotalAmountToPay] = useState(plan.price);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [credit, setCredits] = useState(plan.credit ? plan.credit : 0);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedDate: "",
    appointmentType: "online",
  });

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const tempPayHandle = (event) => {
    event.preventDefault();
    toast.error("Payment option is not yet active!");
  };

  const handleCreditsChange = (newCredits) => {
    setCredits(newCredits);
    calculateAmountToPay(newCredits, discountApplied);
  };

  const calculateAmountToPay = () => {
    setTotalAmountToPay(((100 - discountApplied) / 100) * plan.price);
  };

  const handleApplyVoucher = async (event) => {
    event.preventDefault();
    if (isVoucherApplied) {
      setDiscountApplied(0);
      setVoucherCode("");
      setIsVoucherApplied(false);
      setTotalAmountToPay(plan.price);
    } else {
      const discount = await validateDiscountVoucher(voucherCode);
      const newDiscount = discount ? discount : 0;
      setDiscountApplied(newDiscount);
      setIsVoucherApplied(newDiscount > 0);
      setTotalAmountToPay((((100 - newDiscount) / 100) * plan.price).toFixed(0));
    }
  };

  const handleIncreaseCredits = () => {
    const newCredits = credit + 1;
    handleCreditsChange(newCredits);
  };

  const handleDecreaseCredits = () => {
    if (credit > 1) {
      const newCredits = credit - 1;
      handleCreditsChange(newCredits);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    
    <div className="bg-white p-5 my-8 mt-0 md:w-max max-w-md mx-auto border rounded-lg shadow-md font-poppins">
      <p className="text-2xl font-bold text-center mb-10 text-blue-500">Checkout</p>

      <form>
        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">Selected Plan</label>
          <p className="text-black shadow-sm border p-4 rounded-md text-2xl font-bold">
            {plan.title}
          </p>
        </div>
        {plan.appointment && (
          <>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Select Date</label>
              <input
                type="datetime-local"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Appointment Type</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="appointmentType"
                    value="online"
                    checked={formData.appointmentType === "online"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Online</span>
                </label>
                <label className="flex items-center ">
                  <input
                    type="radio"
                    name="appointmentType"
                    value="offline"
                    checked={formData.appointmentType === "offline"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Offline</span>
                </label>
              </div>
            </div>
          </>
        )}
        <div className="mb-4 mt-4">
          <label className="font-bold text-sm text-gray-700">Discount Code</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name="code"
              placeholder="Enter Discount code"
              value={voucherCode}
              onChange={handleVoucherCodeChange}
              disabled={isVoucherApplied}
              className="flex-1 px-3 py-1 w-10 sm:w-52 text-gray-500 bg-white outline-none border shadow-sm rounded-md"
            />
            <button
              className={`lg:px-5 px-3 text-white text-sm rounded-md duration-150 ${
                isVoucherApplied ? "bg-red-500 hover:bg-red-400" : "bg-[#367AF3] hover:bg-blue-400"
              }`}
              onClick={handleApplyVoucher}
            >
              {isVoucherApplied ? "Remove" : "Apply"}
            </button>
          </div>
          {discountApplied > 0 && (
            <p className="text-green-600 text-sm mt-2 font-bold">
              Code "{voucherCode}" applied for {discountApplied}% discount. <br />
              You save ₹{plan.price - totalAmountToPay}.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">Amount to pay</label>
          <p className="text-black shadow-sm border p-4 rounded-md text-2xl font-bold">
            {currencyCode==='INR'?'₹':'$'}{totalAmountToPay}
          </p>
        </div>

        

        <button
          type="submit"
          onClick={tempPayHandle}
          className="w-full px-4 py-2 text-white bg-[#367AF3] hover:bg-blue-400 active:bg-[#367AF3] rounded-md duration-150"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export { CheckoutPage };

import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import credit from "../../assets/CreditsRemainingIcon.svg";
import giftCardIllustration from "../../assets/gift_card.svg"
import { redeemCoupon, validateCouponCode } from "../../services/userService";
import CreditsRemainingIcon from "./../../assets/CreditsRemainingIcon.svg";
import { toast } from "react-toastify";

export const VoucherSection = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [creditsToBeRedeemed, setCredits] = useState(0)
  const calculateAmountToPay = (event) => {
    const credits = parseInt(event.target.value);
    setTotalAmountToPay(credits*200);
  };

 const handleValidate = async (event) =>{
  event.preventDefault()
  if(isVoucherApplied){
    setIsVoucherApplied(false)
    setCredits(0)
    setCouponCode('')
  }

  else{
  const validationResult = await validateCouponCode(couponCode);
  if(validationResult.status !== 'fail')
  setCredits(validationResult.creditsToBeAdded)
  setIsVoucherApplied(true)
  toast.success("Voucher is valid!")
  }
 }

 const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    await redeemCoupon(couponCode)
    setIsVoucherApplied(false)
    setCredits(0)
    setCouponCode('')
 }
  return (
          <div className="bg-white w-max min-w-20 px-5">
            <form className="space-y-3 py-6 md:py-2 ">
              <div>
                <label className="font-bold text-sm text-gray-700">
                  Voucher Code
                </label>
                <div className="flex gap-2">
                <input
                  type="text"
                  name="credit"
                 value={couponCode}
                 onChange={(e) => setCouponCode(e.target.value)}
                 placeholder="Enter Voucher Code"
                  min={0}
                  required
                  disabled={isVoucherApplied}
                  className="w-full h-10 mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-md"
                />
                <button
                    className={`px-5 text-white text-sm ${isVoucherApplied ? 'bg-red-500 hover:bg-red-400' : 'bg-[#367AF3] hover:bg-blue-400'} active:${isVoucherApplied ? 'bg-red-500' : 'bg-indigo-500'} rounded-md duration-150`}
                    onClick={handleValidate}
                >
                    {isVoucherApplied ? 'Remove' : 'Apply'}
                </button>
              </div>
            <div className="mt-5">
                <label className="font-bold text-sm text-gray-700">
                  Credits to be redeemed
                </label>
                <div
                    className=" flex  font-bold px-3 py-3 text-xl text-black  bg-white rounded-md min-w-[20%] "
                  >
                    <img src={CreditsRemainingIcon} className="h-8 float-start mr-3"></img>
                    {creditsToBeRedeemed} Credits
                    
                    </div>
              </div>
              </div>


              
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full px-4 py-2 mt-11 text-white font-medium bg-[#367AF3] hover:bg-blue-400 active:bg-[#367AF3] rounded-md duration-150"
              >
                Redeem Coupon
              </button>
            </form>
          </div>
  );
};

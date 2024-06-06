import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import credit from "../../assets/CreditsRemainingIcon.svg";
import giftCardIllustration from "../../assets/gift_card.svg"
import { redeemCoupon } from "../../services/userService";

export const RedeemCoupon = () => {
  const [couponCode, setCouponCode] = useState('');

  const calculateAmountToPay = (event) => {
    const credits = parseInt(event.target.value);
    setTotalAmountToPay(credits*200);
  };
 const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    await redeemCoupon(couponCode)
 }
  return (
    <main className="py-0 bg-white min-h-[100vh] ">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:p-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none lg:mr-20">
          <div className="flex flex-col p-4 md:p-1 md:w-[40%]">
            <div className="max-w-lg space-y-3">
              <p className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Reddem coupon codes to add credits to your account!
              </p>

            </div>

            <img
              src={giftCardIllustration}
              alt="illustration img"
              className="hidden md:flex size-60  mt-[30%] ml-[40%]"
            />
          </div>

          <div className="bg-white flex-1 sm:max-w-lg lg:max-w-md shadow-lg border rounded-md duration-300 hover:shadow-sm px-6 lg:pt-2">
            <form className="space-y-3 py-6 md:py-2 " onSubmit={handleSubmit}>
              <p className="font-bold text-xl text-center">Redeem Coupon</p>
              <div className="flex justify-center items-center">
                <img src={credit} alt="credit icon" className="size-24" />
              </div>

              <div>
                <label className="font-medium text-sm text-gray-500">
                  Enter Coupon Code:
                </label>
                <input

                  type="text"
                  name="credit"
                 value={couponCode}
                 onChange={(e) => setCouponCode(e.target.value)}
                 placeholder="Enter coupon code"
                  min={0}
                  required
                  className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 mt-[10%]  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

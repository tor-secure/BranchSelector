import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import credit from "../../assets/CreditsRemainingIcon.svg";
export const BuyCredits = () => {
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);

  const calculateAmountToPay = (event) => {
    const credits = parseInt(event.target.value);
    setTotalAmountToPay(credits*200);
  };

  return (
    <main className="py-0 bg-white min-h-[100vh] ">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:p-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none lg:mr-20">
          <div className="flex flex-col p-4 md:p-1">
            <div className="max-w-lg space-y-3">
              <p className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Get credits and start exploring today!
              </p>
              <p className="text-blue-600 text-2xl font-bold">
                ₹200{" "}
                <span className="text-sm text-gray-400 font-normal">
                  /credit
                </span>
              </p>
              <p>Each credit unlocks one test</p>
              <p>Got a code? Apply it at checkout for a discount!</p>
            </div>

            <img
              src={img}
              alt="illustration img"
              className="hidden md:flex size-60  mt-10 "
            />
          </div>

          <div className="bg-white flex-1 sm:max-w-lg lg:max-w-md shadow-lg border rounded-md duration-300 hover:shadow-sm px-6 lg:pt-2">
            <form className="space-y-3 py-6 md:py-2 ">
              <p className="font-bold text-xl text-center">Buy Credits</p>
              <div className="flex justify-center items-center">
                <img src={credit} alt="credit icon" className="size-24" />
              </div>

              <div>
                <label className="font-medium text-sm text-gray-500">
                  Enter Number of Credits:
                </label>
                <input
                  onChange={calculateAmountToPay}
                  type="number"
                  name="credit"
                  min={0}
                  required
                  className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-sm text-gray-500">
                  Discount Code :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="code"
                    className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                  <button className=" px-2 text-white font-medium bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-500 rounded-lg duration-150">
                    Apply
                  </button>
                </div>
              </div>
              <div>
                <label className="font-medium text-sm text-gray-500">
                  Amount to pay :
                </label>
                <p
                  id="output"
                  className=" w-full mb-4 h-8 mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                >{totalAmountToPay}</p>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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

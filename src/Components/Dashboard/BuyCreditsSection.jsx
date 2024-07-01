import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import creditImg from "../../assets/CreditsRemainingIcon.svg";
import {
  getCurrentUserInfo,
  validateDiscountVoucher,
} from "../../services/userService";
import { toast } from "react-toastify";
import CreditsRemainingIcon from "./../../assets/CreditsRemainingIcon.svg";

export const BuyCreditsSection = () => {
  const [totalAmountToPay, setTotalAmountToPay] = useState(200);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [credit, setCredits] = useState(1);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const tempPayHandle = (event) => {
    event.preventDefault();
    toast.error("Payment option is not yet active!");
  };

  const verifyPayment = async (
    userId,
    userName,
    userEmail,
    creditsPurchased,
    transactionId,
    couponUsed
  ) => {
    const toastId = toast.loading("Verifying payment...", {
      autoClose: false,
      draggable: true,
    });

    try {
      const response = await fetch(
        "https://verify-credit-purchase.branchselector.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            userName,
            creditsPurchased,
            transactionId,
            couponUsed,
            userEmail,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.update(toastId, {
          render: `Payment verified successfully! ${creditsPurchased} credits have been added to your account!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      } else {
        toast.update(toastId, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.update(toastId, {
        render: "Error verifying payment.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true,
      });
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    const toastId = toast.loading("Contacting Payment Gateway...", {
      autoClose: false,
      draggable: true,
    });

    try {
      const userDetails = await getCurrentUserInfo();

      const response = await fetch(
        "https://payment-gateway.branchselector.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode: voucherCode,
            creditsOrdered: credit,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.update(toastId, {
          render: "Redirected to payment gateway successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });

        const options = {
          key_id: "rzp_test_yAtiwPxT3TKKr2", // Enter the Key ID generated from the Dashboard
          amount: data.orderAmount * 100, // Amount in paise
          currency: "INR",
          name: "SurePass",
          description: "Buy Credits",
          order_id: data.razorpayOrder.id, // Razorpay Order ID
          handler: function (response) {
            verifyPayment(
              userDetails.uid,
              userDetails.displayName,
              userDetails.email,
              credit,
              response.razorpay_payment_id,
              voucherCode
            );
          },
          prefill: {
            name: userDetails.displayName,
            email: userDetails.email,
          },
          notes: {
            address:
              "9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru, Karnataka 575003",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error(`Payment Failed: ${response.error.description}`, {
            autoClose: 3000,
            draggable: true,
          });
        });
        rzp1.open();
      } else {
        toast.update(toastId, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          draggable: true,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Error processing payment.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true,
      });
      console.error("Error processing payment:", error);
    }
  };

  const handleCreditsChange = (newCredits) => {
    setCredits(newCredits);
    calculateAmountToPay(newCredits, discountApplied);
  };

  const calculateAmountToPay = (credits, discount) => {
    credits = parseInt(credits);
    setTotalAmountToPay(credits * 200 * ((100 - discount) / 100));
  };

  const handleApplyVoucher = async (event) => {
    event.preventDefault();
    if (isVoucherApplied) {
      setDiscountApplied(0);
      setVoucherCode("");
      setIsVoucherApplied(false);
      calculateAmountToPay(credit, 0);
    } else {
      const discount = await validateDiscountVoucher(voucherCode);
      console.log("Applying discount of", discount);
      const newDiscount = discount ? discount : 0;
      setDiscountApplied(newDiscount);
      setIsVoucherApplied(newDiscount > 0);
      calculateAmountToPay(credit, newDiscount);
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

  return (
    <div className="bg-white p-5 my-8 md:w-max max-w-md mx-auto">
      <form>
        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">Credits</label>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={handleDecreaseCredits}
              className="px-3 py-1 bg-white rounded-full font-bold border"
            >
              -
            </button>
            <div className="flex items-center  justify-centere font-bold px-3 py-3 text-black border  shadow-sm rounded-md ">
              <img
                src={CreditsRemainingIcon}
                className="h-5 mx-1 sm:mx-3 "
                alt="Credits"
              />
              {credit}
            </div>
            <button
              type="button"
              onClick={handleIncreaseCredits}
              className="px-3 py-1 bg-white rounded-full font-bold border"
            >
              +
            </button>
            <span className="font-bold text-sm">1 credit unlocks 1 test</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">
            Discount Code
          </label>
          <div className="flex gap-2 mt-1 ">
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
              className={`lg:px-5 px-3  text-white text-sm rounded-md duration-150 ${
                isVoucherApplied
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-[#367AF3] hover:bg-blue-400"
              }`}
              onClick={handleApplyVoucher}
            >
              {isVoucherApplied ? "Remove" : "Apply"}
            </button>
          </div>
          {discountApplied > 0 && (
            <p className="text-green-600 text-sm mt-2 font-bold">
              Code "{voucherCode}" applied for {discountApplied}% discount.{" "}
              <br />
              You save ₹{(credit * 200 * discountApplied) / 100}.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">
            Amount to pay
          </label>
          <p className="text-black shadow-sm border p-4 rounded-md text-2xl font-bold">
            ₹{totalAmountToPay}
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

import { useState } from "react";
import img from "../../assets/buycreditillustration.svg";
import creditImg from "../../assets/CreditsRemainingIcon.svg";
import { getCurrentUserInfo, validateDiscountVoucher } from "../../services/userService";
import { toast } from 'react-toastify';

export const BuyCredits = () => {
  const [totalAmountToPay, setTotalAmountToPay] = useState(200);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [credit, setCredits] = useState(1);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

const tempPayHandle = (event)=>{
  event.preventDefault()
  toast.error("Payment option is not yet active!")
}

const verifyPayment = async (userId, userName, userEmail, creditsPurchased, transactionId, couponUsed) => {
  const toastId = toast.loading("Verifying payment...", { autoClose: false, draggable: true });

  try {
    const response = await fetch('https://verify-credit-purchase.branchselector.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userName,
        creditsPurchased,
        transactionId,
        couponUsed,
        userEmail
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      toast.update(toastId, {
        render: `Payment verified successfully! ${creditsPurchased} credits have been added to your account!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    } else {
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    toast.update(toastId, {
      render: "Error verifying payment.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
      draggable: true
    });
  }
};


const handlePayment = async (event) => {
  event.preventDefault();

  const toastId = toast.loading("Contacting Payment Gateway...", { autoClose: false, draggable: true });

  try {
    const userDetails = await getCurrentUserInfo();

    const response = await fetch('https://payment-gateway.branchselector.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        couponCode: voucherCode,
        creditsOrdered: credit
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      toast.update(toastId, {
        render: "Redirected to payment gateway successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });

      const options = {
        key_id: 'rzp_test_yAtiwPxT3TKKr2', // Enter the Key ID generated from the Dashboard
        amount: data.orderAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'SurePass',
        description: 'Buy Credits',
        order_id: data.razorpayOrder.id, // Razorpay Order ID
        handler: function (response) {
          verifyPayment(userDetails.uid,userDetails.displayName,userDetails.email,credit,response.razorpay_payment_id,voucherCode)
        },
        prefill: {
          name: userDetails.displayName,
          email: userDetails.email,
        },
        notes: {
          address: '9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru, Karnataka 575003'
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`, {
          autoClose: 3000,
          draggable: true
        });
      });
      rzp1.open();
    } else {
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    }
  } catch (error) {
    toast.update(toastId, {
      render: "Error processing payment.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
      draggable: true
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
      setVoucherCode('');
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
    <main className="py-0 bg-white min-h-[100vh]">
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
              className="hidden md:flex size-60 mt-10"
            />
          </div>

          <div className="bg-white flex-1 sm:max-w-lg lg:max-w-md shadow-lg border rounded-md duration-300 hover:shadow-sm px-6 lg:pt-2">
            <form className="space-y-3 py-6 md:py-2">
              <p className="font-bold text-xl text-center">Buy Credits</p>
              <div className="flex justify-center items-center">
                <img src={creditImg} alt="credit icon" className="size-24" />
              </div>

              <div>
                <label className="font-medium text-sm text-gray-500">
                  Enter Number of Credits:
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleDecreaseCredits}
                    className="px-3 py-1 bg-gray-300 rounded-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="credit"
                    value={credit}
                    readOnly
                    className="w-16 text-center px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleIncreaseCredits}
                    className="px-3 py-1 bg-gray-300 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="font-medium text-sm text-gray-500">
                  Discount Code :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="code"
                    value={voucherCode}
                    onChange={handleVoucherCodeChange}
                    disabled={isVoucherApplied}
                    className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                  <button
                    className={`px-2 text-white font-medium ${isVoucherApplied ? 'bg-red-500 hover:bg-red-400' : 'bg-indigo-500 hover:bg-indigo-400'} active:${isVoucherApplied ? 'bg-red-500' : 'bg-indigo-500'} rounded-lg duration-150`}
                    onClick={handleApplyVoucher}
                  >
                    {isVoucherApplied ? 'Remove' : 'Apply'}
                  </button>
                </div>
                {discountApplied > 0 && (
                  <p className="text-green-600 text-sm mt-2 font-bold">
                   Code "{voucherCode}"  applied for {discountApplied}% discount. <br/>You save ₹{(credit * 200 * discountApplied) / 100}.
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium text-sm text-gray-500">
                  Amount to pay :
                </label>
                <p
                  id="output"
                  className="w-full mb-4 h-8 mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                >
                  ₹{totalAmountToPay}
                </p>
              </div>

              <button

                type='submit'
                onClick = {tempPayHandle}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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

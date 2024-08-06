import { useState } from "react";
import OverlayLoader from "../../Components/OverlayLoader";
import {
  validateDiscountVoucher,
} from "../../services/userService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { handlePayment } from "./PaymentService";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch plan seleted from the pricing page
  const { plan, currencyCode } = location.state || {}; 

  // Setup inital states
  const [totalAmountToPay, setTotalAmountToPay] = useState(plan.price);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setLoading] = useState(false)
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedDate: "",
    appointmentType: "online",
  });

  //Voucher Code change handler
  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  //Temporary submit handler. Doesnt initiate payment. 
  const tempHandleSubmit = (event) => {
    event.preventDefault();
    toast.error("Payment option is not yet active!");
  };
  

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const paymentDetails = {
      couponCode:voucherCode,
      amount:totalAmountToPay,
      currency:currencyCode
    }
    setLoading(true) //Enable overlay loader
    await handlePayment(plan,appointmentFormData,paymentDetails,setLoading,navigate)
  }


  const handleApplyVoucher = async (event) => {
    event.preventDefault();
    // If voucher already applied, apply button will become remove button. So remove coupon code.
    if (isVoucherApplied) {
      setDiscountApplied(0);
      setVoucherCode("");
      setIsVoucherApplied(false);
      setTotalAmountToPay(plan.price);
    } 
    // Else fetch discount details from firebase and apply them.
    else 
    {
      const discount = await validateDiscountVoucher(voucherCode);
      const newDiscount = discount ? discount : 0;
      setDiscountApplied(newDiscount);
      setIsVoucherApplied(newDiscount > 0);
      setTotalAmountToPay((((100 - newDiscount) / 100) * plan.price).toFixed(0));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointmentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-5 my-8 mt-0 md:w-max max-w-md mx-auto border rounded-lg shadow-md font-poppins">
      {/* Overlay loader to prevent users from clicking on button mutliple times */}
      <OverlayLoader isLoading={isLoading} loadingText={"Processing Transaction. Do not refresh or navigate to other page. Please wait..."}/>
      <p className="text-2xl font-bold text-center mb-10 text-blue-500">Checkout</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">Selected Plan</label>
          <p className="text-black shadow-sm border p-4 rounded-md text-xl font-bold">
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
                minLength={2}
                title="Please enter a name with at least 2 characters"
                value={appointmentFormData.fullName}
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
                value={appointmentFormData.email}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-sm text-gray-700">Phone Number</label>
              <input
                type="tel"
                pattern="[1-9]{1}[0-9]{9}"
                name="phoneNumber"
                title="Enter a valid 10 digit phone number"
                value={appointmentFormData.phoneNumber}
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
                value={appointmentFormData.selectedDate}
                onChange={handleInputChange}
                 min={
                  /* Set the minimum selectable day to tommrow */
                  new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 16) 
                  }
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
                    checked={appointmentFormData.appointmentType === "online"}
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
                    checked={appointmentFormData.appointmentType === "offline"}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Offline</span>
                </label>
              </div>

            </div>
            {
            //Show Appointment location if "Offline" Counselling is chosen
            appointmentFormData.appointmentType === 'offline' && (
              <>
               <label className="font-bold text-sm text-gray-700 mt-10">Counselling Location</label>
               <p className="text-black shadow-sm border p-4 rounded-md text-md font-bold mt-1">
                SurePass,<br/> #9, Second floor
                Next to Stock Holding
                Manasa Towers, MG Road, <br/>Mangalore - 575003,<br/> Karnataka, India
                </p>
              </>
               )
              }
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
          {
            //Show coupon applied text if coupoun applied
            discountApplied > 0 && (
              <p className="text-green-600 text-sm mt-2 font-bold">
                Code "{voucherCode}" applied for {discountApplied}% discount. <br />
                You save {currencyCode === 'INR'? '₹' : '$' }{plan.price - totalAmountToPay}.
              </p>
            )
          }
        </div>

        <div className="mb-4">
          <label className="font-bold text-sm text-gray-700">Amount to pay</label>
          <p className="text-black shadow-sm border p-4 rounded-md text-2xl font-bold">
            {currencyCode==='INR'?'₹':'$'}{totalAmountToPay}
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#367AF3] hover:bg-blue-400 active:bg-[#367AF3] rounded-md duration-150"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export { CheckoutPage };

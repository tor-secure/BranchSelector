import Navbar from "../Components/Navbar/Navbar";
import SurePass from "../assets/SurePassLogo.jpeg";
import Img from "../assets/bookAppointment.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {BundlePlanCard, CounsellingPlanCard} from "./PricingPage/PricingPage";
import { LoadingPage } from "./LoadingPage";
import { getPricingPlans } from "./PricingPage/PricingPlans";

    const plans = {
  credits: [
    { credits: 1, price: 199, originalPrice: 199, plandID:'C1' },
    { credits: 3, price: 499, originalPrice: 599, planID:'C3'},
    { credits: 5, price: 799, originalPrice: 999, planID:'C5' },
    { credits: 9, price: 1499, originalPrice: 1799, planID:'C9' },
    { credits: 12, price: 1999, originalPrice: 2399, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", price: 1999, originalPrice: 1999, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling", price: 2499, originalPrice: 2796, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling", price: 2999, originalPrice: 3194, planID: 'CB5' },
  ]

};

function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedDate: "",
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const handleCaptchaChange = () => {
    setCaptchaChecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      // If ReCAPTCHA is not checked, prevent form submission
      alert("Please complete the ReCAPTCHA verification.");
      return;
    }
    try {

      const response = await fetch("https://book-appointment.branchselector.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log("Form submitted successfully!");
        toast.success(
          "Your request has been recived. We will reach out to you shortly"
        );
        navigate("/");
      } else {
        // Handle error
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [plans, setPlans] = useState(null);
  const [currency, setCurrency] = useState('₹');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const data = await getPricingPlans();
      if (data) {

        setPlans(data.plan);
        setCurrency(data.currency);
      }
      setLoading(false);
    };

    fetchPricingPlans();
  }, []);
  if (loading) {
    return <LoadingPage/>;
  }


  return (
    <main className="py-0  my-8 bg-white">
      <div className="  text-gray-600 md:p-8">
        <div className="max-w-lg mx-auto justify-between lg:flex lg:max-w-none ">
          <div className="flex flex-col p-4 md:p-1">
            <div className="max-w-lg space-y-3">
              <p className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Ready to take the next step towards your future success?
              </p>
              <p>
                Our expert counselors from SurePass are here to guide you
                towards the educational courses that best align with your career
                aspirations.
              </p>
              <h3 className="text-indigo-600 font-semibold">
                Choose our Credits + Counselling bundles to save more! 🎉
              </h3>
              <div>
              </div>
            </div>

            <img
              src={Img}
              alt="illustration img"
              className="hidden md:flex w-48 ml-56 "
            />
            <div className="hidden md:block">
              <p className="font-semibold text-sm">
                &nbsp;&nbsp;Counselling Partner,
              </p>
              <div className="flex">
                <img src={SurePass} alt="sure pass logo" className="w-40" />
                <p className="w-48 text-[0.6rem] py-2">
                  9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru,
                  Karnataka 575003
                </p>
              </div>
            </div>
          </div>

      <div   className="ml-0 lg:ml-36  sm:p-8 font-poppins">
            <div className="w-full">
            <CounsellingPlanCard plans={plans} currency={currency}/>
            <BundlePlanCard plans = {plans} currency={currency}/>
            </div>
          </div>
          <div className="md:hidden mt-5 ml-5">
            <p className="font-bold text-sm">Counselling Partner,</p>
            <div className="flex">
              <img src={SurePass} alt="sure pass logo" className="w-40" />
              <p className="w-48 text-[0.6rem] py-2">
                9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru,
                Karnataka 575003
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingPage;

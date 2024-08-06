import SurePass from "../assets/SurePassLogo.jpeg";
import Img from "../assets/bookAppointment.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BundlePlanCard, CounsellingPlanCard} from "./PricingPage/PricingPage";
import { LoadingPage } from "./LoadingPage";
import { getPricingPlans } from "./PricingPage/PricingPlans";


function BookingPage() {
  const navigate = useNavigate();

  const handleCheckout = (plan,currencyCode) =>{
  navigate('/checkout',{state:{plan:plan,currencyCode:currencyCode}})
  }


 
  const [plans, setPlans] = useState(null);
  const [currency, setCurrency] = useState('₹');
  const [loading, setLoading] = useState(true);
  const [currencyCode, setCurrencyCode] = useState(null)

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const data = await getPricingPlans();
      if (data) {

        setPlans(data.plan);
        setCurrency(data.currency);
        setCurrencyCode(data.currencyCode);
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
            <CounsellingPlanCard plans={plans} currency={currency} currencyCode={currencyCode} clickHandler={handleCheckout}/>
            <BundlePlanCard plans = {plans} currency={currency} currencyCode={currencyCode} clickHandler={handleCheckout}/>
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

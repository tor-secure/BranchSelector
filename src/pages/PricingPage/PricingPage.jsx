import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import addCreditImg from "../../assets/AddCreditsSVG.svg";
import { LoadingPage } from '../LoadingPage';
import { getPricingPlans, plansIndia, plansUS } from './PricingPlans';

const handleClick = () => {
  toast.error("Payments not yet active")
};

const SmallCard = ({ credits, price, originalPrice, currency }) => {
  const discount = originalPrice - price;
  return (
    <div onClick={handleClick} className="bg-white cursor-pointer rounded-lg shadow-md p-4 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group">
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm font-bold text-gray-800 duration-300">{credits} {credits === 1 ? 'Credit' : 'Credits'}</p>
        {discount > 0 && (
          <span className="text-xs text-green-500 font-bold duration-300">-{currency}{originalPrice - price}</span>
        )}
      </div>
      <div className="flex items-baseline mt-1">
        <span className="text-2xl font-bold text-blue-600 duration-300">{currency}{price}</span>
        {originalPrice > price && (
          <span className="ml-2 text-sm text-gray-500 line-through transition-opacity duration-300 opacity-70 group-hover:opacity-100">
            {currency}{originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};

const LargeCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 w-full mb-4 transition-all duration-300 ease-in-out hover:shadow-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const LongCard = ({ title, price, originalPrice, currency }) => {
  const discount = originalPrice - price;
  return (
    <div onClick={handleClick} className="bg-white cursor-pointer rounded-lg shadow-md p-4 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group">
      <p className="text-sm font-bold text-gray-800 duration-300">{title}</p>
      <div className="flex items-baseline mt-1 justify-between">
        <span className="text-2xl font-bold text-blue-600 duration-300">{currency}{price}</span>
      </div>
    </div>
  );
};

const CreditPlanCard = ({plans,currency}) =>{
  return(
        <LargeCard title="Credit Bundle">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plans.credits.map((plan, index) => (
              <SmallCard key={index} {...plan} currency={currency} />
            ))}
          </div>
        </LargeCard>
  )
}

const CounsellingPlanCard = ({plans,currency}) =>{
  return (
        <LargeCard title="Counseling Session">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.counselingSession.map((session, index) => (
              <LongCard key={index} {...session} currency={currency} />
            ))}
          </div>
        </LargeCard>
  )
}

const BundlePlanCard = ({plans,currency}) =>
{
return(
        <LargeCard title="Credits + Counseling Session Bundle">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.bundle.map((session, index) => (
              <LongCard key={index} {...session} currency={currency} />
            ))}
          </div>
        </LargeCard>
)

}

const PricingPage = () => {
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
    <div style={{
      background: "linear-gradient(143.6deg, rgba(28, 124, 252, 0) 20.79%, rgba(28, 124, 252, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
    }} className="flex flex-col lg:flex-row p-4 sm:p-8 font-poppins">
      <div className="w-full lg:w-1/3 lg:pr-8 mb-6 lg:mb-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Buy credits to continue your journey into self discovery!
        </h2>
        <p className="text-sm text-gray-600">
          1 credit allows you to take a test one time
        </p>
        <br />
      </div>
      <div className="w-full lg:w-2/3">
      <CreditPlanCard plans={plans} currency = {currency}/>
      <CounsellingPlanCard plans = {plans} currency = {currency}/>
      <BundlePlanCard plans = {plans} currency={currency}/>


      </div>
    </div>
  );
};

export { PricingPage, LongCard, LargeCard, SmallCard, CreditPlanCard, BundlePlanCard, CounsellingPlanCard };

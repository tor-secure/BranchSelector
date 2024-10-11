import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { getPricingPlans } from "../../pages/PricingPage/PricingPlans";
import { LoadingPage } from "../../pages/LoadingPage";
import { LargeContainerCard, SmallCard } from "../../pages/PricingPage/PricingPage";


//Section in user dashboard
export const BuyCreditsSection = () => {
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
  
  const CreditPlanCard = ({plans,currency,currencyCode,clickHandler}) =>{
    return(
          <LargeContainerCard title="Credit Bundle">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {plans.credits.map((plan, index) => (
                <SmallCard key={index} plan={plan} currency={currency} currencyCode={currencyCode} clickHandler={clickHandler}/>
              ))}
            </div>
          </LargeContainerCard>
    )
  }

  return (
    <div className="bg-white p-5 my-8 mt-0 md:w-max max-w-md mx-auto">
      <CreditPlanCard plans={plans} currency = {currency} currencyCode={currencyCode} clickHandler={handleCheckout}/>
      
    </div>
  );
};
